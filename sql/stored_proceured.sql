CREATE
OR REPLACE FUNCTION execute_and_get_payments( _fecha character varying, _tasa_interes decimal, _dias_anio_comercial integer )
    RETURNS TABLE(
        cliente varchar,
        plazo integer,
        interes double precision,
        monto double precision,
        iva double precision,
        pago double precision
    ) 
    LANGUAGE plpgsql AS 
    $func$
declare vfecha DATE;
declare vtasa_interes DECIMAL;
declare vdias_anio_comercial INTEGER;
declare vcliente varchar;
declare vamount decimal;
declare vtotal_amount NUMERIC;
declare vcurrent_client record;
declare vcurrent_loan record;
declare vcurrent_amount decimal;

BEGIN 
    /* Se toman variables recibidas */
	SELECT TO_DATE(_fecha,'YYYY-MM-DD') INTO vfecha;
	SELECT _dias_anio_comercial into vdias_anio_comercial;
	SELECT _tasa_interes into vtasa_interes;

	create temp TABLE payments (
		client varchar NOT NULL,
		plazo int4 NULL,
		interes double precision NULL,
		monto double precision null,
		iva double precision null,
		amount double precision NULL
	) ON COMMIT DELETE ROWS;

    /* Se consulta clientes activos */
    for vcurrent_client in select client, amount from public.accounts where status = 'Activa'
    loop 
	    
	    select vcurrent_client.amount into vcurrent_amount;
        /* Se consulta prestamos por usuario, se hacen calculos */
	    for vcurrent_loan in select  
	    l.client,
	    l.id, 
	    b.iva,
	    vfecha - l.date_loan as plazo,
	    round(((l.amount * (vfecha - l.date_loan) * (vtasa_interes/100)) / vdias_anio_comercial),2)   as interes,
	    round(((l.amount * (vfecha - l.date_loan) * (vtasa_interes/100)) / vdias_anio_comercial) * b.iva,2) as iva,
	    l.amount + round(((l.amount * (vfecha - l.date_loan) * (vtasa_interes/100)) / vdias_anio_comercial),2) +  round(((l.amount * (vfecha - l.date_loan) * (vtasa_interes/100)) / vdias_anio_comercial) * b.iva,2) as pago
	    from public.loans l 
	    join public.branches b on b.id = l.id_sucursal
	    where l.client = vcurrent_client.client
	    and l.status = 'Pendiente'
	    order by l.date_loan
	    loop 
            /* Por cada prestamo, se identifica si es posible su pago*/
		    if (vcurrent_amount >= vcurrent_loan.pago)
		    then 
                /* Si es posible su pago, se actualiza prestamo y amount del cliente */
		    	select vcurrent_amount - vcurrent_loan.pago into vcurrent_amount;
		    	
		    	update public.loans set status = 'Pagado' 
		    	where loans.client = vcurrent_loan.client
		    	and loans.id = vcurrent_loan.id;

                /* Si se paga un registro se guarda en tabla temporal*/
		        insert into payments values(
		       		vcurrent_client.client , 
		       		vcurrent_loan.plazo ,
		       		vcurrent_loan.interes,
		       		vcurrent_amount,
		       		vcurrent_loan.iva,
		       		vcurrent_loan.pago
		       	);
	    		

		    end if;
	    end loop;
	   
        /* se actualiza cuenta del cliente con su amount resultante */
	  	update public.accounts set amount = vcurrent_amount
	  	where accounts.client = vcurrent_client.client;

    end loop;
   	/* se retorna tabla temporal */
  	return query 
  	select payments.client,payments.plazo,payments.interes,payments.monto,payments.iva,payments.amount from payments;
	drop table payments;
    END 
    $func$;
CREATE
OR REPLACE FUNCTION get_active_loans_2( _fecha character varying, _tasa_interes decimal, _dias_anio_comercial integer )
    RETURNS TABLE(
        cliente varchar,
        plazo varchar,
        monto decimal,
        iva decimal,
        pago decimal
    ) 
    LANGUAGE plpgsql AS 
    $func$
declare vfecha DATE;
declare vtasa_interes DECIMAL;
declare vdias_anio_comercial INTEGER;
declare vcliente varchar;
declare vamount decimal;
declare vfinal_amount NUMERIC;

SELECT TO_DATE(_fecha,'YYYY-MM-DD') INTO vfecha;
SELECT _dias_anio_comercial into vdias_anio_comercial;
SELECT _tasa_interes into vtasa_interes

BEGIN 
    for vcurrent_client in select client from public.accounts where status = 'Activa'
    loop 
	    select 
	    current_date - l.date_loan as plazo,
	    (l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial   as interes,
	    ((l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial) * b.iva  as iva,
	    l.amount + ((l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial) +  ((l.amount * (current_date - l.date_loan) * vtasa_interes ) / vdias_anio_comercial) * b.iva as pago
	    join public.loans l on l.client = vcurrent_client.client 
	    join public.branches b on b.id = l.id_sucursal;

    end loop;

    END 
    $func$;
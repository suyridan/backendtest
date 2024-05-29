create temp TABLE payments (
	client varchar NOT NULL,
	plazo int4 NULL,
	interes double precision NULL,
	monto double precision null,
	iva double precision null,
	amount double precision NULL
) ON COMMIT DELETE ROWS;
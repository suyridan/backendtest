CREATE TABLE public.branches (
	id bigint NOT NULL,
	"name" varchar NOT NULL,
	iva decimal NOT NULL,
	CONSTRAINT branches_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.branches IS 'Sucursales';

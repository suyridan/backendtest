CREATE TABLE public.loans (
	id bigint NOT NULL,
	client varchar NOT NULL,
	date_loan date NOT NULL,
	amount decimal NULL,
	status varchar NULL,
	id_sucursal bigint NULL,
	CONSTRAINT loans_pk PRIMARY KEY (id)
);

INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (1,'911ac37c-5990-4bf8-8cf0-b51f21c8ecbe','2021-01-15',37500,'Pendiente',3);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (2,'911ac37c-5990-4bf8-8cf0-b51f21c8ecbe','2021-01-24',725.18,'Pendiente',3);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (3,'911ac37c-5990-4bf8-8cf0-b51f21c8ecbe','2021-02-05',1578.22,'Pendiente',3);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (4,'911ac37c-5990-4bf8-8cf0-b51f21c8ecbe','2021-02-09',380,'Pendiente',3);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (1,'8482bcae-0b2b-45bb-9012-59ec93978265','2021-01-12',2175.25,'Pendiente',2);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (2,'8482bcae-0b2b-45bb-9012-59ec93978265','2021-01-18',499.99,'Pendiente',2);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (3,'8482bcae-0b2b-45bb-9012-59ec93978265','2021-01-29',5725.18,'Pendiente',2);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (4,'8482bcae-0b2b-45bb-9012-59ec93978265','2021-02-12',876.13,'Pendiente',2);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (1,'78be3a77-698d-43ef-b113-a598eb1fb791','2021-02-09',545.55,'Pendiente',1);
INSERT INTO public.loans (id,client,date_loan,amount,status,id_sucursal) VALUES (1,'cee008ca-c715-456b-96c6-74ff9bd22dd3','2020-12-31',15220,'Pendiente',1);

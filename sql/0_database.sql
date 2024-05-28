--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 15.3

-- Started on 2024-05-28 17:01:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 228 (class 1255 OID 1103114)
-- Name: get_active_loans(date, numeric, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_active_loans(_fecha date, _tasa_interes numeric, _dias_anio_comercial integer) RETURNS TABLE(plazo integer, monto numeric, iva numeric, pago numeric)
    LANGUAGE plpgsql
    AS $$
declare vfecha DATE;
declare vtasa_interes DECIMAL;
declare vdias_anio_comercial INTEGER;
BEGIN 
    SELECT _fecha INTO vfecha;
    select _tasa_interes into vtasa_interes;
    select _dias_anio_comercial into vdias_anio_comercial;

    RETURN QUERY
    select 
    current_date - l.date_loan as plazo,
    (l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial   as interes,
    ((l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial) * b.iva  as iva,
    l.amount + ((l.amount * (current_date - l.date_loan) * vtasa_interes) / vdias_anio_comercial) +  ((l.amount * (current_date - l.date_loan) * vtasa_interes ) / vdias_anio_comercial) * b.iva as pago
    from public.accounts a
    join public.loans l on l.client = a.client 
    join public.branches b on b.id = l.id_sucursal;
    END 
    $$;


ALTER FUNCTION public.get_active_loans(_fecha date, _tasa_interes numeric, _dias_anio_comercial integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 1103096)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    client character varying NOT NULL,
    amount numeric NOT NULL,
    status character varying NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 1103088)
-- Name: branches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branches (
    id bigint NOT NULL,
    name character varying NOT NULL,
    iva numeric NOT NULL
);


ALTER TABLE public.branches OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE branches; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.branches IS 'Sucursales';


--
-- TOC entry 201 (class 1259 OID 1103080)
-- Name: loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loans (
    id bigint NOT NULL,
    client character varying NOT NULL,
    date_loan date NOT NULL,
    amount numeric,
    status character varying,
    id_sucursal bigint
);


ALTER TABLE public.loans OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 1111308)
-- Name: menu_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    title character varying,
    type_menu character varying,
    key_menu character varying,
    icon character varying,
    "order" integer,
    parent_id integer,
    link character varying
);


ALTER TABLE public.menu_items OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 1111306)
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_items_id_seq OWNER TO postgres;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 205
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- TOC entry 204 (class 1259 OID 1103126)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2887 (class 2604 OID 1111311)
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- TOC entry 3028 (class 0 OID 1103096)
-- Dependencies: 203
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (client, amount, status) FROM stdin;
911ac37c-5990-4bf8-8cf0-b51f21c8ecbe	15375.28	Activa
8482bcae-0b2b-45bb-9012-59ec93978265	3728.51	Bloqueada
78be3a77-698d-43ef-b113-a598eb1fb791	0	Cancelada
cee008ca-c715-456b-96c6-74ff9bd22dd3	235.28	Activa
\.


--
-- TOC entry 3027 (class 0 OID 1103088)
-- Dependencies: 202
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branches (id, name, iva) FROM stdin;
1	Tijuana	8
2	Nuevo Leon	16
3	Tamaulipas	10
\.


--
-- TOC entry 3026 (class 0 OID 1103080)
-- Dependencies: 201
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loans (id, client, date_loan, amount, status, id_sucursal) FROM stdin;
1	911ac37c-5990-4bf8-8cf0-b51f21c8ecbe	2021-01-15	37500	Pendiente	3
2	911ac37c-5990-4bf8-8cf0-b51f21c8ecbe	2021-01-24	725.18	Pendiente	3
3	911ac37c-5990-4bf8-8cf0-b51f21c8ecbe	2021-02-05	1578.22	Pendiente	3
4	911ac37c-5990-4bf8-8cf0-b51f21c8ecbe	2021-02-09	380	Pendiente	3
1	8482bcae-0b2b-45bb-9012-59ec93978265	2021-01-12	2175.25	Pendiente	2
2	8482bcae-0b2b-45bb-9012-59ec93978265	2021-01-18	499.99	Pendiente	2
3	8482bcae-0b2b-45bb-9012-59ec93978265	2021-01-29	5725.18	Pendiente	2
4	8482bcae-0b2b-45bb-9012-59ec93978265	2021-02-12	876.13	Pendiente	2
1	78be3a77-698d-43ef-b113-a598eb1fb791	2021-02-09	545.55	Pendiente	1
1	cee008ca-c715-456b-96c6-74ff9bd22dd3	2020-12-31	15220	Pendiente	1
\.


--
-- TOC entry 3031 (class 0 OID 1111308)
-- Dependencies: 206
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu_items (id, created_at, updated_at, title, type_menu, key_menu, icon, "order", parent_id, link) FROM stdin;
1	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Configuración	group	configuration	\N	\N	\N	\N
2	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Administración	collapsable	administration	heroicons_solid:book-open	1	1	\N
6	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Permisos	collapsable	permissionsCollapse	heroicons_solid:lock-closed	2	1	\N
3	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Usuarios1	basic	users1	heroicons_outline:users	1	2	/ruta1
4	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	claves	basic	claves	heroicons_outline:key	1	2	/ruta2
5	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Cuentas	basic	accounts	heroicons_outline:banknotes	1	2	/ruta3
7	2024-05-28 13:18:27.834061	2024-05-28 13:18:27.834061	Usuarios	basic	users	heroicons_outline:user-circle	\N	6	/ruta4
8	2024-05-28 13:31:13.494139	2024-05-28 13:31:13.494139	Permisos	basic	permissions	heroicons_outline:lock-closed	\N	6	/ruta5
9	2024-05-28 13:31:13.498915	2024-05-28 13:31:13.498915	Menu por Permisos	basic	permissionsMenu	heroicons_outline:globe-alt	\N	6	/ruta6
\.


--
-- TOC entry 3029 (class 0 OID 1103126)
-- Dependencies: 204
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, role, created_at, updated_at) FROM stdin;
98d84c58-5cf2-4d79-8af5-c76cdd10d0a0	albertohs	hernandezsalberto@gmail.com	$2b$12$TqPrrVTwJDUlLwTbc1y4ce6odOom7B4Gz49LLD43G/qPdbRb3MUq.	admin	2024-05-28 08:40:37.336876	2024-05-28 08:40:37.336876
\.


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 205
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 11, true);


--
-- TOC entry 2895 (class 2606 OID 1111318)
-- Name: menu_items PK_57e6188f929e5dc6919168620c8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY (id);


--
-- TOC entry 2893 (class 2606 OID 1103137)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 2891 (class 2606 OID 1103095)
-- Name: branches branches_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pk PRIMARY KEY (id);


--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-05-28 17:01:44

--
-- PostgreSQL database dump complete
--


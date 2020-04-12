--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: locator_authmethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_authmethod (
    id integer NOT NULL,
    name character varying(16) NOT NULL
);


ALTER TABLE public.locator_authmethod OWNER TO postgres;

--
-- Name: locator_authcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_authcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_authcategory_id_seq OWNER TO postgres;

--
-- Name: locator_authcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_authcategory_id_seq OWNED BY public.locator_authmethod.id;


--
-- Name: locator_servicecategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_servicecategory (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.locator_servicecategory OWNER TO postgres;

--
-- Name: locator_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_categories_id_seq OWNER TO postgres;

--
-- Name: locator_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_categories_id_seq OWNED BY public.locator_servicecategory.id;


--
-- Name: locator_ccfcategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_ccfcategory (
    id integer NOT NULL,
    name character varying(16) NOT NULL
);


ALTER TABLE public.locator_ccfcategory OWNER TO postgres;

--
-- Name: locator_ccfcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_ccfcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_ccfcategory_id_seq OWNER TO postgres;

--
-- Name: locator_ccfcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_ccfcategory_id_seq OWNED BY public.locator_ccfcategory.id;


--
-- Name: locator_contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_contacts (
    id integer NOT NULL,
    name character varying(35) NOT NULL,
    title character varying(30),
    email character varying(320),
    phone character varying(25),
    location_id integer NOT NULL
);


ALTER TABLE public.locator_contacts OWNER TO postgres;

--
-- Name: locator_contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_contacts_id_seq OWNER TO postgres;

--
-- Name: locator_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_contacts_id_seq OWNED BY public.locator_contacts.id;


--
-- Name: locator_daytimerange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_daytimerange (
    id integer NOT NULL,
    day character varying(3) NOT NULL,
    open_time time without time zone NOT NULL,
    close_time time without time zone NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.locator_daytimerange OWNER TO postgres;

--
-- Name: locator_daytimerange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_daytimerange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_daytimerange_id_seq OWNER TO postgres;

--
-- Name: locator_daytimerange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_daytimerange_id_seq OWNED BY public.locator_daytimerange.id;


--
-- Name: locator_drugscreenmethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_drugscreenmethod (
    id integer NOT NULL,
    name character varying(16) NOT NULL,
    ccf_category_id integer
);


ALTER TABLE public.locator_drugscreenmethod OWNER TO postgres;

--
-- Name: locator_drugscreenauthcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_drugscreenauthcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_drugscreenauthcategory_id_seq OWNER TO postgres;

--
-- Name: locator_drugscreenauthcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_drugscreenauthcategory_id_seq OWNED BY public.locator_drugscreenmethod.id;


--
-- Name: locator_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_location (
    id integer NOT NULL,
    name character varying(70) NOT NULL,
    branch_name character varying(30) NOT NULL,
    street_line_1 character varying(50) NOT NULL,
    street_line_2 character varying(35) NOT NULL,
    city character varying(45) NOT NULL,
    state character varying(2) NOT NULL,
    zipcode character varying(10) NOT NULL,
    comments text NOT NULL,
    last_updated timestamp with time zone NOT NULL,
    location_category_id integer,
    fax character varying(14) NOT NULL,
    phone character varying(25) NOT NULL
);


ALTER TABLE public.locator_location OWNER TO postgres;

--
-- Name: locator_location_auth_method_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_location_auth_method_list (
    id integer NOT NULL,
    location_id integer NOT NULL,
    authmethod_id integer NOT NULL
);


ALTER TABLE public.locator_location_auth_method_list OWNER TO postgres;

--
-- Name: locator_location_auth_method_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_location_auth_method_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_location_auth_method_list_id_seq OWNER TO postgres;

--
-- Name: locator_location_auth_method_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_location_auth_method_list_id_seq OWNED BY public.locator_location_auth_method_list.id;


--
-- Name: locator_location_ds_method_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_location_ds_method_list (
    id integer NOT NULL,
    location_id integer NOT NULL,
    drugscreenmethod_id integer NOT NULL
);


ALTER TABLE public.locator_location_ds_method_list OWNER TO postgres;

--
-- Name: locator_location_ds_auth_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_location_ds_auth_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_location_ds_auth_list_id_seq OWNER TO postgres;

--
-- Name: locator_location_ds_auth_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_location_ds_auth_list_id_seq OWNED BY public.locator_location_ds_method_list.id;


--
-- Name: locator_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_location_id_seq OWNER TO postgres;

--
-- Name: locator_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_location_id_seq OWNED BY public.locator_location.id;


--
-- Name: locator_location_service_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_location_service_list (
    id integer NOT NULL,
    location_id integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.locator_location_service_list OWNER TO postgres;

--
-- Name: locator_location_services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_location_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_location_services_id_seq OWNER TO postgres;

--
-- Name: locator_location_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_location_services_id_seq OWNED BY public.locator_location_service_list.id;


--
-- Name: locator_locationcategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_locationcategory (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.locator_locationcategory OWNER TO postgres;

--
-- Name: locator_locationcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_locationcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_locationcategory_id_seq OWNER TO postgres;

--
-- Name: locator_locationcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_locationcategory_id_seq OWNED BY public.locator_locationcategory.id;


--
-- Name: locator_locationhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_locationhistory (
    id integer NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.locator_locationhistory OWNER TO postgres;

--
-- Name: locator_locationhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_locationhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_locationhistory_id_seq OWNER TO postgres;

--
-- Name: locator_locationhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_locationhistory_id_seq OWNED BY public.locator_locationhistory.id;


--
-- Name: locator_rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_rating (
    id integer NOT NULL,
    rating integer NOT NULL,
    datetime_submitted timestamp with time zone NOT NULL,
    location_id integer NOT NULL,
    comments character varying(255) NOT NULL
);


ALTER TABLE public.locator_rating OWNER TO postgres;

--
-- Name: locator_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_rating_id_seq OWNER TO postgres;

--
-- Name: locator_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_rating_id_seq OWNED BY public.locator_rating.id;


--
-- Name: locator_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_service (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    cost numeric(5,2) NOT NULL,
    service_category_id integer
);


ALTER TABLE public.locator_service OWNER TO postgres;

--
-- Name: locator_service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_service_id_seq OWNER TO postgres;

--
-- Name: locator_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_service_id_seq OWNED BY public.locator_service.id;


--
-- Name: locator_servicetimerange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_servicetimerange (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.locator_servicetimerange OWNER TO postgres;

--
-- Name: locator_servicetimerange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_servicetimerange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_servicetimerange_id_seq OWNER TO postgres;

--
-- Name: locator_servicetimerange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_servicetimerange_id_seq OWNED BY public.locator_servicetimerange.id;


--
-- Name: locator_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locator_user (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    location_id integer NOT NULL,
    rating_id integer NOT NULL
);


ALTER TABLE public.locator_user OWNER TO postgres;

--
-- Name: locator_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locator_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locator_user_id_seq OWNER TO postgres;

--
-- Name: locator_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locator_user_id_seq OWNED BY public.locator_user.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: locator_authmethod id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_authmethod ALTER COLUMN id SET DEFAULT nextval('public.locator_authcategory_id_seq'::regclass);


--
-- Name: locator_ccfcategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_ccfcategory ALTER COLUMN id SET DEFAULT nextval('public.locator_ccfcategory_id_seq'::regclass);


--
-- Name: locator_contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_contacts ALTER COLUMN id SET DEFAULT nextval('public.locator_contacts_id_seq'::regclass);


--
-- Name: locator_daytimerange id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_daytimerange ALTER COLUMN id SET DEFAULT nextval('public.locator_daytimerange_id_seq'::regclass);


--
-- Name: locator_drugscreenmethod id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_drugscreenmethod ALTER COLUMN id SET DEFAULT nextval('public.locator_drugscreenauthcategory_id_seq'::regclass);


--
-- Name: locator_location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location ALTER COLUMN id SET DEFAULT nextval('public.locator_location_id_seq'::regclass);


--
-- Name: locator_location_auth_method_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_auth_method_list ALTER COLUMN id SET DEFAULT nextval('public.locator_location_auth_method_list_id_seq'::regclass);


--
-- Name: locator_location_ds_method_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_ds_method_list ALTER COLUMN id SET DEFAULT nextval('public.locator_location_ds_auth_list_id_seq'::regclass);


--
-- Name: locator_location_service_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_service_list ALTER COLUMN id SET DEFAULT nextval('public.locator_location_services_id_seq'::regclass);


--
-- Name: locator_locationcategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationcategory ALTER COLUMN id SET DEFAULT nextval('public.locator_locationcategory_id_seq'::regclass);


--
-- Name: locator_locationhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationhistory ALTER COLUMN id SET DEFAULT nextval('public.locator_locationhistory_id_seq'::regclass);


--
-- Name: locator_rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_rating ALTER COLUMN id SET DEFAULT nextval('public.locator_rating_id_seq'::regclass);


--
-- Name: locator_service id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_service ALTER COLUMN id SET DEFAULT nextval('public.locator_service_id_seq'::regclass);


--
-- Name: locator_servicecategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicecategory ALTER COLUMN id SET DEFAULT nextval('public.locator_categories_id_seq'::regclass);


--
-- Name: locator_servicetimerange id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicetimerange ALTER COLUMN id SET DEFAULT nextval('public.locator_servicetimerange_id_seq'::regclass);


--
-- Name: locator_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_user ALTER COLUMN id SET DEFAULT nextval('public.locator_user_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add categories	7	add_categories
26	Can change categories	7	change_categories
27	Can delete categories	7	delete_categories
28	Can view categories	7	view_categories
29	Can add location	8	add_location
30	Can change location	8	change_location
31	Can delete location	8	delete_location
32	Can view location	8	view_location
33	Can add user	9	add_user
34	Can change user	9	change_user
35	Can delete user	9	delete_user
36	Can view user	9	view_user
37	Can add service	10	add_service
38	Can change service	10	change_service
39	Can delete service	10	delete_service
40	Can view service	10	view_service
41	Can add rating	11	add_rating
42	Can change rating	11	change_rating
43	Can delete rating	11	delete_rating
44	Can view rating	11	view_rating
45	Can add service time range	12	add_servicetimerange
46	Can change service time range	12	change_servicetimerange
47	Can delete service time range	12	delete_servicetimerange
48	Can view service time range	12	view_servicetimerange
49	Can add day time range	13	add_daytimerange
50	Can change day time range	13	change_daytimerange
51	Can delete day time range	13	delete_daytimerange
52	Can view day time range	13	view_daytimerange
53	Can add service categories	7	add_servicecategories
54	Can change service categories	7	change_servicecategories
55	Can delete service categories	7	delete_servicecategories
56	Can view service categories	7	view_servicecategories
57	Can add service category	7	add_servicecategory
58	Can change service category	7	change_servicecategory
59	Can delete service category	7	delete_servicecategory
60	Can view service category	7	view_servicecategory
61	Can add location category	14	add_locationcategory
62	Can change location category	14	change_locationcategory
63	Can delete location category	14	delete_locationcategory
64	Can view location category	14	view_locationcategory
65	Can add auth category	15	add_authcategory
66	Can change auth category	15	change_authcategory
67	Can delete auth category	15	delete_authcategory
68	Can view auth category	15	view_authcategory
69	Can add contacts	16	add_contacts
70	Can change contacts	16	change_contacts
71	Can delete contacts	16	delete_contacts
72	Can view contacts	16	view_contacts
73	Can add ccf category	17	add_ccfcategory
74	Can change ccf category	17	change_ccfcategory
75	Can delete ccf category	17	delete_ccfcategory
76	Can view ccf category	17	view_ccfcategory
77	Can add drug screen auth category	18	add_drugscreenauthcategory
78	Can change drug screen auth category	18	change_drugscreenauthcategory
79	Can delete drug screen auth category	18	delete_drugscreenauthcategory
80	Can view drug screen auth category	18	view_drugscreenauthcategory
81	Can add drug screen method	18	add_drugscreenmethod
82	Can change drug screen method	18	change_drugscreenmethod
83	Can delete drug screen method	18	delete_drugscreenmethod
84	Can view drug screen method	18	view_drugscreenmethod
85	Can add location history	19	add_locationhistory
86	Can change location history	19	change_locationhistory
87	Can delete location history	19	delete_locationhistory
88	Can view location history	19	view_locationhistory
89	Can add auth method	15	add_authmethod
90	Can change auth method	15	change_authmethod
91	Can delete auth method	15	delete_authmethod
92	Can view auth method	15	view_authmethod
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$180000$y1VG1wcXmv6J$8fXeAQTbs4zLmr8os5BfSvB3tFtVDlnBmXcR3zYyDEM=	2020-04-12 02:19:57.949048-07	t	admin			robo.media28@gmail.com	t	t	2020-04-11 00:36:29.002116-07
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2020-04-12 02:31:42.061474-07	1	Standard 10p w/SVT	2	[]	10	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
8	locator	location
9	locator	user
10	locator	service
11	locator	rating
12	locator	servicetimerange
13	locator	daytimerange
7	locator	servicecategory
14	locator	locationcategory
16	locator	contacts
17	locator	ccfcategory
18	locator	drugscreenmethod
19	locator	locationhistory
15	locator	authmethod
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2020-04-10 21:43:38.147756-07
2	auth	0001_initial	2020-04-10 21:43:38.217714-07
3	admin	0001_initial	2020-04-10 21:43:38.371619-07
4	admin	0002_logentry_remove_auto_add	2020-04-10 21:43:38.397603-07
5	admin	0003_logentry_add_action_flag_choices	2020-04-10 21:43:38.414592-07
6	contenttypes	0002_remove_content_type_name	2020-04-10 21:43:38.428584-07
7	auth	0002_alter_permission_name_max_length	2020-04-10 21:43:38.432582-07
8	auth	0003_alter_user_email_max_length	2020-04-10 21:43:38.439577-07
9	auth	0004_alter_user_username_opts	2020-04-10 21:43:38.445573-07
10	auth	0005_alter_user_last_login_null	2020-04-10 21:43:38.452569-07
11	auth	0006_require_contenttypes_0002	2020-04-10 21:43:38.453568-07
12	auth	0007_alter_validators_add_error_messages	2020-04-10 21:43:38.461564-07
13	auth	0008_alter_user_username_max_length	2020-04-10 21:43:38.48355-07
14	auth	0009_alter_user_last_name_max_length	2020-04-10 21:43:38.490547-07
15	auth	0010_alter_group_name_max_length	2020-04-10 21:43:38.498542-07
16	auth	0011_update_proxy_permissions	2020-04-10 21:43:38.505537-07
17	sessions	0001_initial	2020-04-10 21:43:38.525525-07
18	locator	0001_initial	2020-04-11 23:31:07.684904-07
19	locator	0002_auto_20200412_0008	2020-04-12 00:08:57.725624-07
20	locator	0003_auto_20200412_0010	2020-04-12 00:10:20.842954-07
21	locator	0004_auto_20200412_0028	2020-04-12 00:28:10.148974-07
22	locator	0005_auto_20200412_0033	2020-04-12 00:33:04.700998-07
23	locator	0006_auto_20200412_0100	2020-04-12 01:00:54.651264-07
24	locator	0007_auto_20200412_0128	2020-04-12 01:28:23.075111-07
25	locator	0008_auto_20200412_0202	2020-04-12 02:02:42.286851-07
26	locator	0009_ccfcategory_drugscreenauthcategory	2020-04-12 02:16:01.291697-07
27	locator	0010_auto_20200412_0345	2020-04-12 03:45:15.849363-07
28	locator	0011_auto_20200412_0356	2020-04-12 03:56:49.236232-07
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
x5bphnx1hpv16ht6ym008lxs6v6fvtyp	YjYxMWE3OTYyZjg1MTRiNTJkZDQ4MzhiODY1ZWNlN2VmMWE0MzIzMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MDgyNjE5NTgxNDQxMWM3MTMyZTIwNTFiMmE0YTZkYzYzMzY1MWQxIn0=	2020-04-26 02:19:57.950047-07
\.


--
-- Data for Name: locator_authmethod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_authmethod (id, name) FROM stdin;
1	Aya
2	EScreen
3	Mobile Health
4	Proprietary
\.


--
-- Data for Name: locator_ccfcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_ccfcategory (id, name) FROM stdin;
1	Alter
2	Paper
3	Electronic
\.


--
-- Data for Name: locator_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_contacts (id, name, title, email, phone, location_id) FROM stdin;
\.


--
-- Data for Name: locator_daytimerange; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_daytimerange (id, day, open_time, close_time, location_id) FROM stdin;
\.


--
-- Data for Name: locator_drugscreenmethod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_drugscreenmethod (id, name, ccf_category_id) FROM stdin;
\.


--
-- Data for Name: locator_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_location (id, name, branch_name, street_line_1, street_line_2, city, state, zipcode, comments, last_updated, location_category_id, fax, phone) FROM stdin;
\.


--
-- Data for Name: locator_location_auth_method_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_location_auth_method_list (id, location_id, authmethod_id) FROM stdin;
\.


--
-- Data for Name: locator_location_ds_method_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_location_ds_method_list (id, location_id, drugscreenmethod_id) FROM stdin;
\.


--
-- Data for Name: locator_location_service_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_location_service_list (id, location_id, service_id) FROM stdin;
\.


--
-- Data for Name: locator_locationcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_locationcategory (id, name) FROM stdin;
\.


--
-- Data for Name: locator_locationhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_locationhistory (id, location_id) FROM stdin;
\.


--
-- Data for Name: locator_rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_rating (id, rating, datetime_submitted, location_id, comments) FROM stdin;
\.


--
-- Data for Name: locator_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_service (id, name, cost, service_category_id) FROM stdin;
1	Standard 10p w/SVT	75.00	2
\.


--
-- Data for Name: locator_servicecategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_servicecategory (id, name) FROM stdin;
3	Respiratory Evaluation
4	TB Screening
5	Vaccinations
6	Bloodwork
7	Physicals
8	Vision Screening
2	Drug Screening
9	Other
\.


--
-- Data for Name: locator_servicetimerange; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_servicetimerange (id, name, start_time, end_time, location_id) FROM stdin;
\.


--
-- Data for Name: locator_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locator_user (id, name, location_id, rating_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 92, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 19, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 28, true);


--
-- Name: locator_authcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_authcategory_id_seq', 4, true);


--
-- Name: locator_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_categories_id_seq', 9, true);


--
-- Name: locator_ccfcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_ccfcategory_id_seq', 3, true);


--
-- Name: locator_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_contacts_id_seq', 1, false);


--
-- Name: locator_daytimerange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_daytimerange_id_seq', 1, false);


--
-- Name: locator_drugscreenauthcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_drugscreenauthcategory_id_seq', 1, false);


--
-- Name: locator_location_auth_method_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_location_auth_method_list_id_seq', 1, false);


--
-- Name: locator_location_ds_auth_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_location_ds_auth_list_id_seq', 1, false);


--
-- Name: locator_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_location_id_seq', 1, false);


--
-- Name: locator_location_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_location_services_id_seq', 1, false);


--
-- Name: locator_locationcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_locationcategory_id_seq', 1, false);


--
-- Name: locator_locationhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_locationhistory_id_seq', 1, false);


--
-- Name: locator_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_rating_id_seq', 1, false);


--
-- Name: locator_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_service_id_seq', 1, true);


--
-- Name: locator_servicetimerange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_servicetimerange_id_seq', 1, false);


--
-- Name: locator_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locator_user_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: locator_location location_name_branch_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location
    ADD CONSTRAINT location_name_branch_name_key UNIQUE (name, branch_name);


--
-- Name: locator_authmethod locator_authcategory_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_authmethod
    ADD CONSTRAINT locator_authcategory_name_key UNIQUE (name);


--
-- Name: locator_authmethod locator_authcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_authmethod
    ADD CONSTRAINT locator_authcategory_pkey PRIMARY KEY (id);


--
-- Name: locator_servicecategory locator_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicecategory
    ADD CONSTRAINT locator_categories_pkey PRIMARY KEY (id);


--
-- Name: locator_ccfcategory locator_ccfcategory_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_ccfcategory
    ADD CONSTRAINT locator_ccfcategory_name_key UNIQUE (name);


--
-- Name: locator_ccfcategory locator_ccfcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_ccfcategory
    ADD CONSTRAINT locator_ccfcategory_pkey PRIMARY KEY (id);


--
-- Name: locator_contacts locator_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_contacts
    ADD CONSTRAINT locator_contacts_pkey PRIMARY KEY (id);


--
-- Name: locator_daytimerange locator_daytimerange_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_daytimerange
    ADD CONSTRAINT locator_daytimerange_pkey PRIMARY KEY (id);


--
-- Name: locator_drugscreenmethod locator_drugscreenauthcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_drugscreenmethod
    ADD CONSTRAINT locator_drugscreenauthcategory_pkey PRIMARY KEY (id);


--
-- Name: locator_location_auth_method_list locator_location_auth_me_location_id_authmethod_i_ca6220fd_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_auth_method_list
    ADD CONSTRAINT locator_location_auth_me_location_id_authmethod_i_ca6220fd_uniq UNIQUE (location_id, authmethod_id);


--
-- Name: locator_location_auth_method_list locator_location_auth_method_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_auth_method_list
    ADD CONSTRAINT locator_location_auth_method_list_pkey PRIMARY KEY (id);


--
-- Name: locator_location_ds_method_list locator_location_ds_auth_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_ds_method_list
    ADD CONSTRAINT locator_location_ds_auth_list_pkey PRIMARY KEY (id);


--
-- Name: locator_location_ds_method_list locator_location_ds_auth_location_id_drugscreenme_00366f1e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_ds_method_list
    ADD CONSTRAINT locator_location_ds_auth_location_id_drugscreenme_00366f1e_uniq UNIQUE (location_id, drugscreenmethod_id);


--
-- Name: locator_location locator_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location
    ADD CONSTRAINT locator_location_pkey PRIMARY KEY (id);


--
-- Name: locator_location_service_list locator_location_services_location_id_service_id_12cbb336_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_service_list
    ADD CONSTRAINT locator_location_services_location_id_service_id_12cbb336_uniq UNIQUE (location_id, service_id);


--
-- Name: locator_location_service_list locator_location_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_service_list
    ADD CONSTRAINT locator_location_services_pkey PRIMARY KEY (id);


--
-- Name: locator_locationcategory locator_locationcategory_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationcategory
    ADD CONSTRAINT locator_locationcategory_name_key UNIQUE (name);


--
-- Name: locator_locationcategory locator_locationcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationcategory
    ADD CONSTRAINT locator_locationcategory_pkey PRIMARY KEY (id);


--
-- Name: locator_locationhistory locator_locationhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationhistory
    ADD CONSTRAINT locator_locationhistory_pkey PRIMARY KEY (id);


--
-- Name: locator_rating locator_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_rating
    ADD CONSTRAINT locator_rating_pkey PRIMARY KEY (id);


--
-- Name: locator_service locator_service_name_deefca5e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_service
    ADD CONSTRAINT locator_service_name_deefca5e_uniq UNIQUE (name);


--
-- Name: locator_service locator_service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_service
    ADD CONSTRAINT locator_service_pkey PRIMARY KEY (id);


--
-- Name: locator_servicecategory locator_servicecategory_name_363affa8_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicecategory
    ADD CONSTRAINT locator_servicecategory_name_363affa8_uniq UNIQUE (name);


--
-- Name: locator_servicetimerange locator_servicetimerange_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicetimerange
    ADD CONSTRAINT locator_servicetimerange_pkey PRIMARY KEY (id);


--
-- Name: locator_user locator_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_user
    ADD CONSTRAINT locator_user_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: locator_authcategory_name_b8d52a86_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_authcategory_name_b8d52a86_like ON public.locator_authmethod USING btree (name varchar_pattern_ops);


--
-- Name: locator_ccfcategory_name_be16ecbd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_ccfcategory_name_be16ecbd_like ON public.locator_ccfcategory USING btree (name varchar_pattern_ops);


--
-- Name: locator_contacts_location_id_9830f19e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_contacts_location_id_9830f19e ON public.locator_contacts USING btree (location_id);


--
-- Name: locator_daytimerange_location_id_4f411bdb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_daytimerange_location_id_4f411bdb ON public.locator_daytimerange USING btree (location_id);


--
-- Name: locator_drugscreenauthcategory_ccf_category_id_709eb01c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_drugscreenauthcategory_ccf_category_id_709eb01c ON public.locator_drugscreenmethod USING btree (ccf_category_id);


--
-- Name: locator_location_auth_method_list_authmethod_id_329c0e66; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_auth_method_list_authmethod_id_329c0e66 ON public.locator_location_auth_method_list USING btree (authmethod_id);


--
-- Name: locator_location_auth_method_list_location_id_d43fc470; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_auth_method_list_location_id_d43fc470 ON public.locator_location_auth_method_list USING btree (location_id);


--
-- Name: locator_location_ds_auth_list_drugscreenmethod_id_85c2f625; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_ds_auth_list_drugscreenmethod_id_85c2f625 ON public.locator_location_ds_method_list USING btree (drugscreenmethod_id);


--
-- Name: locator_location_ds_auth_list_location_id_d0a6f701; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_ds_auth_list_location_id_d0a6f701 ON public.locator_location_ds_method_list USING btree (location_id);


--
-- Name: locator_location_location_category_id_99c4fe5f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_location_category_id_99c4fe5f ON public.locator_location USING btree (location_category_id);


--
-- Name: locator_location_services_location_id_d949398b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_services_location_id_d949398b ON public.locator_location_service_list USING btree (location_id);


--
-- Name: locator_location_services_service_id_444d906d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_location_services_service_id_444d906d ON public.locator_location_service_list USING btree (service_id);


--
-- Name: locator_locationcategory_name_7a5a9d4f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_locationcategory_name_7a5a9d4f_like ON public.locator_locationcategory USING btree (name varchar_pattern_ops);


--
-- Name: locator_locationhistory_location_id_1ed0ff1c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_locationhistory_location_id_1ed0ff1c ON public.locator_locationhistory USING btree (location_id);


--
-- Name: locator_rating_location_id_5f2ebddb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_rating_location_id_5f2ebddb ON public.locator_rating USING btree (location_id);


--
-- Name: locator_service_name_deefca5e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_service_name_deefca5e_like ON public.locator_service USING btree (name varchar_pattern_ops);


--
-- Name: locator_service_service_category_id_2fd42a99; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_service_service_category_id_2fd42a99 ON public.locator_service USING btree (service_category_id);


--
-- Name: locator_servicecategory_name_363affa8_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_servicecategory_name_363affa8_like ON public.locator_servicecategory USING btree (name varchar_pattern_ops);


--
-- Name: locator_servicetimerange_location_id_901a186c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_servicetimerange_location_id_901a186c ON public.locator_servicetimerange USING btree (location_id);


--
-- Name: locator_user_location_id_f0bca9f2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_user_location_id_f0bca9f2 ON public.locator_user USING btree (location_id);


--
-- Name: locator_user_rating_id_5dacb3ae; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX locator_user_rating_id_5dacb3ae ON public.locator_user USING btree (rating_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_contacts locator_contacts_location_id_9830f19e_fk_locator_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_contacts
    ADD CONSTRAINT locator_contacts_location_id_9830f19e_fk_locator_location_id FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_daytimerange locator_daytimerange_location_id_4f411bdb_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_daytimerange
    ADD CONSTRAINT locator_daytimerange_location_id_4f411bdb_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_drugscreenmethod locator_drugscreenau_ccf_category_id_709eb01c_fk_locator_c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_drugscreenmethod
    ADD CONSTRAINT locator_drugscreenau_ccf_category_id_709eb01c_fk_locator_c FOREIGN KEY (ccf_category_id) REFERENCES public.locator_ccfcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_auth_method_list locator_location_aut_authmethod_id_329c0e66_fk_locator_a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_auth_method_list
    ADD CONSTRAINT locator_location_aut_authmethod_id_329c0e66_fk_locator_a FOREIGN KEY (authmethod_id) REFERENCES public.locator_authmethod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_auth_method_list locator_location_aut_location_id_d43fc470_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_auth_method_list
    ADD CONSTRAINT locator_location_aut_location_id_d43fc470_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_ds_method_list locator_location_ds__drugscreenmethod_id_d9fd277f_fk_locator_d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_ds_method_list
    ADD CONSTRAINT locator_location_ds__drugscreenmethod_id_d9fd277f_fk_locator_d FOREIGN KEY (drugscreenmethod_id) REFERENCES public.locator_drugscreenmethod(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_ds_method_list locator_location_ds__location_id_49e4fc9b_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_ds_method_list
    ADD CONSTRAINT locator_location_ds__location_id_49e4fc9b_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location locator_location_location_category_id_99c4fe5f_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location
    ADD CONSTRAINT locator_location_location_category_id_99c4fe5f_fk_locator_l FOREIGN KEY (location_category_id) REFERENCES public.locator_locationcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_service_list locator_location_ser_location_id_dc4b19ac_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_service_list
    ADD CONSTRAINT locator_location_ser_location_id_dc4b19ac_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_location_service_list locator_location_ser_service_id_bf580505_fk_locator_s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_location_service_list
    ADD CONSTRAINT locator_location_ser_service_id_bf580505_fk_locator_s FOREIGN KEY (service_id) REFERENCES public.locator_service(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_locationhistory locator_locationhist_location_id_1ed0ff1c_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_locationhistory
    ADD CONSTRAINT locator_locationhist_location_id_1ed0ff1c_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_rating locator_rating_location_id_5f2ebddb_fk_locator_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_rating
    ADD CONSTRAINT locator_rating_location_id_5f2ebddb_fk_locator_location_id FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_service locator_service_service_category_id_2fd42a99_fk_locator_s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_service
    ADD CONSTRAINT locator_service_service_category_id_2fd42a99_fk_locator_s FOREIGN KEY (service_category_id) REFERENCES public.locator_servicecategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_servicetimerange locator_servicetimer_location_id_901a186c_fk_locator_l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_servicetimerange
    ADD CONSTRAINT locator_servicetimer_location_id_901a186c_fk_locator_l FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_user locator_user_location_id_f0bca9f2_fk_locator_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_user
    ADD CONSTRAINT locator_user_location_id_f0bca9f2_fk_locator_location_id FOREIGN KEY (location_id) REFERENCES public.locator_location(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: locator_user locator_user_rating_id_5dacb3ae_fk_locator_rating_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locator_user
    ADD CONSTRAINT locator_user_rating_id_5dacb3ae_fk_locator_rating_id FOREIGN KEY (rating_id) REFERENCES public.locator_rating(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--


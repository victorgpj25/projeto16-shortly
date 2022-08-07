--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

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
-- Name: urls; Type: TABLE; Schema: public; Owner: uqkpgmhkfgkjyw
--

CREATE TABLE "public"."urls" (
    "id" integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" "text" NOT NULL,
    "url" "text" NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" "date" DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.urls OWNER TO uqkpgmhkfgkjyw;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: uqkpgmhkfgkjyw
--

CREATE SEQUENCE "public"."urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO uqkpgmhkfgkjyw;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER SEQUENCE "public"."urls_id_seq" OWNED BY "public"."urls"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: uqkpgmhkfgkjyw
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "createdAt" "date" DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.users OWNER TO uqkpgmhkfgkjyw;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: uqkpgmhkfgkjyw
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO uqkpgmhkfgkjyw;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urls_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: uqkpgmhkfgkjyw
--

COPY "public"."urls" ("id", "userId", "shortUrl", "url", "visitCount", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: uqkpgmhkfgkjyw
--

COPY "public"."users" ("id", "name", "email", "password", "createdAt") FROM stdin;
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: uqkpgmhkfgkjyw
--

SELECT pg_catalog.setval('"public"."urls_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: uqkpgmhkfgkjyw
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 1, false);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: uqkpgmhkfgkjyw
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--


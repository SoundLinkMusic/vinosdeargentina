-- Force PostgREST cache reset by notifying of schema changes
SELECT pg_sleep(0.1);
NOTIFY pgrst, 'reload schema';

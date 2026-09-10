-- Supabase Data API に公開される public テーブルを保護する。
-- Prisma は PostgreSQL に直接接続するため、テーブル所有者によるアクセスは維持される。

-- 今後 public に作成されるテーブルでは、RLS を有効化し、Supabase の
-- クライアント用ロールに付与された権限を取り除く。
CREATE OR REPLACE FUNCTION public.attt_secure_new_public_table()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
    command record;
BEGIN
    FOR command IN
        SELECT *
        FROM pg_event_trigger_ddl_commands()
        WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
          AND object_type IN ('table', 'partitioned table')
          AND schema_name = 'public'
    LOOP
        EXECUTE format(
            'ALTER TABLE %s ENABLE ROW LEVEL SECURITY',
            command.object_identity
        );

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
            EXECUTE format(
                'REVOKE ALL PRIVILEGES ON TABLE %s FROM anon',
                command.object_identity
            );
        END IF;

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
            EXECUTE format(
                'REVOKE ALL PRIVILEGES ON TABLE %s FROM authenticated',
                command.object_identity
            );
        END IF;
    END LOOP;
END;
$$;

-- event trigger からのみ実行し、Data API などからの直接実行を許可しない。
REVOKE ALL PRIVILEGES
ON FUNCTION public.attt_secure_new_public_table()
FROM PUBLIC;

DROP EVENT TRIGGER IF EXISTS attt_secure_new_public_tables;

CREATE EVENT TRIGGER attt_secure_new_public_tables
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
EXECUTE FUNCTION public.attt_secure_new_public_table();

-- マイグレーション作成前から存在する public テーブルにも同じ設定を適用する。
DO $$
DECLARE
    target record;
BEGIN
    FOR target IN
        SELECT namespace.nspname AS schema_name, class.relname AS table_name
        FROM pg_class AS class
        INNER JOIN pg_namespace AS namespace ON namespace.oid = class.relnamespace
        WHERE namespace.nspname = 'public'
          AND class.relkind IN ('r', 'p')
    LOOP
        EXECUTE format(
            'ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY',
            target.schema_name,
            target.table_name
        );

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
            EXECUTE format(
                'REVOKE ALL PRIVILEGES ON TABLE %I.%I FROM anon',
                target.schema_name,
                target.table_name
            );
        END IF;

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
            EXECUTE format(
                'REVOKE ALL PRIVILEGES ON TABLE %I.%I FROM authenticated',
                target.schema_name,
                target.table_name
            );
        END IF;
    END LOOP;
END;
$$;

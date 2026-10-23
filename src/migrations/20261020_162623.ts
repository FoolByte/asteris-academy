import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_blocks_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Pendaftaran Siswa Baru TA 2025/2026 Dibuka',
  	"title" varchar DEFAULT 'Mempersiapkan Generasi Unggul Berkarakter Global & Berbasis Teknologi.' NOT NULL,
  	"description" varchar DEFAULT 'SMP Modernisasi Teknologi memadukan kurikulum internasional Cambridge dengan pembelajaran teknologi aplikatif, lab robotika, dan pembinaan karakter berbudi pekerti luhur.',
  	"image_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"image_badge" varchar DEFAULT 'Lab Robotika & Kecerdasan Buatan',
  	"primary_button_label" varchar DEFAULT 'Daftar Sekarang',
  	"primary_button_url" varchar DEFAULT '#daftar',
  	"secondary_button_label" varchar DEFAULT 'Jadwalkan Kunjungan',
  	"secondary_button_url" varchar DEFAULT '#kunjungan',
  	"block_name" varchar
  );
  
  DROP INDEX "home_page_updated_at_idx";
  DROP INDEX "home_page_created_at_idx";
  ALTER TABLE "home_page" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "home_page" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "home_page" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "home_page_blocks_hero_trust_indicators" ADD CONSTRAINT "home_page_blocks_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_hero_trust_indicators_order_idx" ON "home_page_blocks_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_trust_indicators_parent_id_idx" ON "home_page_blocks_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_order_idx" ON "home_page_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_parent_id_idx" ON "home_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_path_idx" ON "home_page_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_page_blocks_hero_image_idx" ON "home_page_blocks_hero" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_blocks_hero_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_hero" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_blocks_hero_trust_indicators" CASCADE;
  DROP TABLE "home_page_blocks_hero" CASCADE;
  ALTER TABLE "home_page" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "home_page" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "home_page" ALTER COLUMN "created_at" SET NOT NULL;
  CREATE INDEX "home_page_updated_at_idx" ON "home_page" USING btree ("updated_at");
  CREATE INDEX "home_page_created_at_idx" ON "home_page" USING btree ("created_at");`)
}

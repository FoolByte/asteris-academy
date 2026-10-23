import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_blocks_features_cards_background_color" AS ENUM('bg-blue-200', 'bg-red-200');
  CREATE TABLE "home_page_blocks_features_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar NOT NULL,
  	"background_color" "enum_home_page_blocks_features_cards_background_color" DEFAULT 'bg-blue-200' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Pondasi Pendidikan Berstandar Dunia' NOT NULL,
  	"subtitle" varchar DEFAULT 'Empat pilar utama yang dirancang untuk mengasah potensi analitis, kreativitas, dan kepemimpinan setiap anak.',
  	"block_name" varchar
  );
  
  ALTER TABLE "home_page_blocks_features_cards" ADD CONSTRAINT "home_page_blocks_features_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_features" ADD CONSTRAINT "home_page_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_features_cards_order_idx" ON "home_page_blocks_features_cards" USING btree ("_order");
  CREATE INDEX "home_page_blocks_features_cards_parent_id_idx" ON "home_page_blocks_features_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_features_order_idx" ON "home_page_blocks_features" USING btree ("_order");
  CREATE INDEX "home_page_blocks_features_parent_id_idx" ON "home_page_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_features_path_idx" ON "home_page_blocks_features" USING btree ("_path");
  ALTER TABLE "home_page" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_blocks_features_cards" CASCADE;
  DROP TABLE "home_page_blocks_features" CASCADE;
  ALTER TABLE "home_page" ADD COLUMN "title" varchar DEFAULT 'Homepage' NOT NULL;
  DROP TYPE "public"."enum_home_page_blocks_features_cards_background_color";`)
}

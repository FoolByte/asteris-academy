import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('anchor', 'internal', 'external', 'whatsapp');
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('anchor', 'internal', 'external', 'whatsapp');
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'anchor' NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_anchor" varchar,
  	"link_path" varchar,
  	"link_url" varchar,
  	"link_wa_message" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"school_name" varchar NOT NULL,
  	"cta_link_type" "enum_header_cta_link_type" DEFAULT 'anchor',
  	"cta_link_label" varchar,
  	"cta_link_anchor" varchar,
  	"cta_link_path" varchar,
  	"cta_link_url" varchar,
  	"cta_link_wa_message" varchar,
  	"cta_link_new_tab" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_content_missions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mission_statement" varchar NOT NULL
  );
  
  CREATE TABLE "home_content_modern_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "home_content_school_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "home_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline" varchar NOT NULL,
  	"hero_subtext" varchar NOT NULL,
  	"hero_background_media_id" integer,
  	"hero_cta_text" varchar DEFAULT 'Portal PPDB' NOT NULL,
  	"hero_cta_link" varchar DEFAULT '/ppdb' NOT NULL,
  	"about_title" varchar DEFAULT 'Jejak Langkah & Visi Kami' NOT NULL,
  	"about_description" jsonb NOT NULL,
  	"about_image_id" integer,
  	"established_year" numeric NOT NULL,
  	"vision" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_page_missions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_modern_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_school_stats" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_missions" CASCADE;
  DROP TABLE "home_page_modern_features" CASCADE;
  DROP TABLE "home_page_school_stats" CASCADE;
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_background_media_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_about_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_home_page_fk";
  
  DROP INDEX "home_page_hero_background_media_idx";
  DROP INDEX "home_page_about_image_idx";
  DROP INDEX "payload_locked_documents_rels_home_page_id_idx";
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "home_page" ADD COLUMN "title" varchar DEFAULT 'Homepage' NOT NULL;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_content_missions" ADD CONSTRAINT "home_content_missions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_content_modern_features" ADD CONSTRAINT "home_content_modern_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_content_school_stats" ADD CONSTRAINT "home_content_school_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_content" ADD CONSTRAINT "home_content_hero_background_media_id_media_id_fk" FOREIGN KEY ("hero_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_content" ADD CONSTRAINT "home_content_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "home_content_missions_order_idx" ON "home_content_missions" USING btree ("_order");
  CREATE INDEX "home_content_missions_parent_id_idx" ON "home_content_missions" USING btree ("_parent_id");
  CREATE INDEX "home_content_modern_features_order_idx" ON "home_content_modern_features" USING btree ("_order");
  CREATE INDEX "home_content_modern_features_parent_id_idx" ON "home_content_modern_features" USING btree ("_parent_id");
  CREATE INDEX "home_content_school_stats_order_idx" ON "home_content_school_stats" USING btree ("_order");
  CREATE INDEX "home_content_school_stats_parent_id_idx" ON "home_content_school_stats" USING btree ("_parent_id");
  CREATE INDEX "home_content_hero_background_media_idx" ON "home_content" USING btree ("hero_background_media_id");
  CREATE INDEX "home_content_about_image_idx" ON "home_content" USING btree ("about_image_id");
  ALTER TABLE "home_page" DROP COLUMN "hero_headline";
  ALTER TABLE "home_page" DROP COLUMN "hero_subtext";
  ALTER TABLE "home_page" DROP COLUMN "hero_background_media_id";
  ALTER TABLE "home_page" DROP COLUMN "hero_cta_text";
  ALTER TABLE "home_page" DROP COLUMN "hero_cta_link";
  ALTER TABLE "home_page" DROP COLUMN "about_title";
  ALTER TABLE "home_page" DROP COLUMN "about_description";
  ALTER TABLE "home_page" DROP COLUMN "about_image_id";
  ALTER TABLE "home_page" DROP COLUMN "established_year";
  ALTER TABLE "home_page" DROP COLUMN "vision";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "home_page_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_missions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mission_statement" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_modern_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "home_page_school_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_content_missions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_content_modern_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_content_school_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "home_content_missions" CASCADE;
  DROP TABLE "home_content_modern_features" CASCADE;
  DROP TABLE "home_content_school_stats" CASCADE;
  DROP TABLE "home_content" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "home_page_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "hero_headline" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_subtext" varchar NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_background_media_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "hero_cta_text" varchar DEFAULT 'Portal PPDB' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "hero_cta_link" varchar DEFAULT '/ppdb' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_title" varchar DEFAULT 'Jejak Langkah & Visi Kami' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_description" jsonb NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "about_image_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "established_year" numeric NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "vision" varchar NOT NULL;
  ALTER TABLE "home_page_missions" ADD CONSTRAINT "home_page_missions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_modern_features" ADD CONSTRAINT "home_page_modern_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_school_stats" ADD CONSTRAINT "home_page_school_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_missions_order_idx" ON "home_page_missions" USING btree ("_order");
  CREATE INDEX "home_page_missions_parent_id_idx" ON "home_page_missions" USING btree ("_parent_id");
  CREATE INDEX "home_page_modern_features_order_idx" ON "home_page_modern_features" USING btree ("_order");
  CREATE INDEX "home_page_modern_features_parent_id_idx" ON "home_page_modern_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_school_stats_order_idx" ON "home_page_school_stats" USING btree ("_order");
  CREATE INDEX "home_page_school_stats_parent_id_idx" ON "home_page_school_stats" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_home_page_fk" FOREIGN KEY ("home_page_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_media_id_media_id_fk" FOREIGN KEY ("hero_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_home_page_id_idx" ON "payload_locked_documents_rels" USING btree ("home_page_id");
  CREATE INDEX "home_page_hero_background_media_idx" ON "home_page" USING btree ("hero_background_media_id");
  CREATE INDEX "home_page_about_image_idx" ON "home_page" USING btree ("about_image_id");
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  ALTER TABLE "home_page" DROP COLUMN "title";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_cta_link_type";`)
}

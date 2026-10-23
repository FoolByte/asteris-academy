import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_navigation_link_type" AS ENUM('anchor', 'internal', 'external', 'whatsapp');
  CREATE TYPE "public"."enum_footer_bottom_bar_legal_links_link_type" AS ENUM('anchor', 'internal', 'external', 'whatsapp');
  CREATE TYPE "public"."enum_curr_hl_background_color" AS ENUM('bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200');
  CREATE TABLE "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_site_settings_navigation_link_type" DEFAULT 'anchor' NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_anchor" varchar,
  	"link_path" varchar,
  	"link_url" varchar,
  	"link_wa_message" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer_bottom_bar_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_bottom_bar_legal_links_link_type" DEFAULT 'anchor' NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_anchor" varchar,
  	"link_path" varchar,
  	"link_url" varchar,
  	"link_wa_message" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"school_info_description" varchar NOT NULL,
  	"school_info_accreditation" varchar NOT NULL,
  	"contact_info_address" varchar NOT NULL,
  	"contact_info_email" varchar NOT NULL,
  	"contact_info_phone" varchar NOT NULL,
  	"communication_description" varchar NOT NULL,
  	"communication_whatsapp_url" varchar,
  	"communication_whatsapp_label" varchar,
  	"bottom_bar_copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_blocks_curriculum_cards_grade" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "curr_hl" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar NOT NULL,
  	"background_color" "enum_curr_hl_background_color" DEFAULT 'bg-blue-200' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_curriculum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Akademik & Karakter Berkelanjutan' NOT NULL,
  	"title" varchar DEFAULT 'Kurikulum Terpadu: Cambridge Lower Secondary & Kurikulum Merdeka' NOT NULL,
  	"subtitle" varchar DEFAULT 'Mengintegrasikan kedalaman sains, matematika terapan, dan kefasihan bahasa Inggris Cambridge dengan fleksibilitas eksplorasi minat siswa dan proyek penguatan profil pelajar Pancasila.',
  	"block_name" varchar
  );
  
  ALTER TABLE "site_settings_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_favicon_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_og_image_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DEFAULT 'bg-blue-200'::text;
  DROP TYPE "public"."enum_home_page_blocks_features_cards_background_color";
  CREATE TYPE "public"."enum_home_page_blocks_features_cards_background_color" AS ENUM('bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200');
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DEFAULT 'bg-blue-200'::"public"."enum_home_page_blocks_features_cards_background_color";
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_home_page_blocks_features_cards_background_color" USING "background_color"::"public"."enum_home_page_blocks_features_cards_background_color";
  DROP INDEX "site_settings_favicon_idx";
  DROP INDEX "site_settings_og_image_idx";
  DROP INDEX "header_logo_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "site_name" varchar NOT NULL;
  ALTER TABLE "home_page_blocks_hero" ADD COLUMN "icon_name" varchar NOT NULL;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_bar_legal_links" ADD CONSTRAINT "footer_bottom_bar_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_curriculum_cards_grade" ADD CONSTRAINT "home_page_blocks_curriculum_cards_grade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_curriculum"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "curr_hl" ADD CONSTRAINT "curr_hl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_curriculum"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_curriculum" ADD CONSTRAINT "home_page_blocks_curriculum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_bar_legal_links_order_idx" ON "footer_bottom_bar_legal_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_bar_legal_links_parent_id_idx" ON "footer_bottom_bar_legal_links" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_curriculum_cards_grade_order_idx" ON "home_page_blocks_curriculum_cards_grade" USING btree ("_order");
  CREATE INDEX "home_page_blocks_curriculum_cards_grade_parent_id_idx" ON "home_page_blocks_curriculum_cards_grade" USING btree ("_parent_id");
  CREATE INDEX "curr_hl_order_idx" ON "curr_hl" USING btree ("_order");
  CREATE INDEX "curr_hl_parent_id_idx" ON "curr_hl" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_curriculum_order_idx" ON "home_page_blocks_curriculum" USING btree ("_order");
  CREATE INDEX "home_page_blocks_curriculum_parent_id_idx" ON "home_page_blocks_curriculum" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_curriculum_path_idx" ON "home_page_blocks_curriculum" USING btree ("_path");
  ALTER TABLE "site_settings" DROP COLUMN "title";
  ALTER TABLE "site_settings" DROP COLUMN "tagline";
  ALTER TABLE "site_settings" DROP COLUMN "favicon_id";
  ALTER TABLE "site_settings" DROP COLUMN "email";
  ALTER TABLE "site_settings" DROP COLUMN "phone";
  ALTER TABLE "site_settings" DROP COLUMN "whatsapp";
  ALTER TABLE "site_settings" DROP COLUMN "address";
  ALTER TABLE "site_settings" DROP COLUMN "maps_url";
  ALTER TABLE "site_settings" DROP COLUMN "opening_hours";
  ALTER TABLE "site_settings" DROP COLUMN "meta_title_template";
  ALTER TABLE "site_settings" DROP COLUMN "meta_description";
  ALTER TABLE "site_settings" DROP COLUMN "og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "noindex";
  ALTER TABLE "site_settings" DROP COLUMN "ga_id";
  ALTER TABLE "site_settings" DROP COLUMN "gtm_id";
  ALTER TABLE "site_settings" DROP COLUMN "maintenance_mode";
  ALTER TABLE "site_settings" DROP COLUMN "maintenance_message";
  ALTER TABLE "site_settings" DROP COLUMN "announcement";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "school_name";
  DROP TYPE "public"."enum_site_settings_socials_platform";
  DROP TYPE "public"."enum_header_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('instagram', 'facebook', 'youtube', 'linkedin', 'x', 'tiktok');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('anchor', 'internal', 'external', 'whatsapp');
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
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
  
  ALTER TABLE "site_settings_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_bar_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_curriculum_cards_grade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "curr_hl" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_blocks_curriculum" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "footer_bottom_bar_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_page_blocks_curriculum_cards_grade" CASCADE;
  DROP TABLE "curr_hl" CASCADE;
  DROP TABLE "home_page_blocks_curriculum" CASCADE;
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DATA TYPE text;
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DEFAULT 'bg-white'::text;
  DROP TYPE "public"."enum_home_page_blocks_features_cards_background_color";
  CREATE TYPE "public"."enum_home_page_blocks_features_cards_background_color" AS ENUM('bg-blue-200', 'bg-red-200');
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DEFAULT 'bg-white'::"public"."enum_home_page_blocks_features_cards_background_color";
  ALTER TABLE "home_page_blocks_features_cards" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_home_page_blocks_features_cards_background_color" USING "background_color"::"public"."enum_home_page_blocks_features_cards_background_color";
  ALTER TABLE "site_settings" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "tagline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "favicon_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "phone" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "whatsapp" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "address" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "maps_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "opening_hours" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "meta_title_template" varchar DEFAULT '%s | Nama Situs';
  ALTER TABLE "site_settings" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "noindex" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "ga_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "gtm_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "maintenance_mode" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "maintenance_message" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "announcement" varchar;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer NOT NULL;
  ALTER TABLE "header" ADD COLUMN "school_name" varchar NOT NULL;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  ALTER TABLE "site_settings" DROP COLUMN "site_name";
  ALTER TABLE "home_page_blocks_hero" DROP COLUMN "icon_name";
  DROP TYPE "public"."enum_site_settings_navigation_link_type";
  DROP TYPE "public"."enum_footer_bottom_bar_legal_links_link_type";
  DROP TYPE "public"."enum_curr_hl_background_color";`)
}

CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"address_line_1" varchar(255) NOT NULL,
	"address_line_2" varchar(255),
	"city" varchar(100) NOT NULL,
	"county" varchar(100),
	"eircode" varchar(20),
	"country" varchar(2) DEFAULT 'IE' NOT NULL,
	"phone" varchar(20),
	"is_default_shipping" boolean DEFAULT false NOT NULL,
	"is_default_billing" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"note" text NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "newsletter_subscribers" ADD COLUMN "source" varchar(50) DEFAULT 'footer';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "flavor_profile" text[];--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "reorder_point" integer DEFAULT 10;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "retail_referral_code" varchar(20);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "wholesale_referral_code" varchar(20);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "commission_earned" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_notes" ADD CONSTRAINT "customer_notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_notes" ADD CONSTRAINT "customer_notes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "addresses_user_id_idx" ON "addresses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "customer_notes_user_id_idx" ON "customer_notes" USING btree ("user_id");
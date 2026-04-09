-- Settings tables for PUXX Ireland Admin Dashboard

-- Settings table (key-value store for general settings)
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" jsonb NOT NULL,
	"description" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);

-- Shipping zones table
CREATE TABLE "shipping_zones" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"countries" text[] NOT NULL,
	"methods" jsonb NOT NULL, -- Array of {name, cost, free_threshold, estimated_days}
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Email templates table
CREATE TABLE "email_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"html_content" text NOT NULL,
	"text_content" text,
	"variables" text[], -- Available variables like {{orderNumber}}, {{customerName}}
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_templates_slug_unique" UNIQUE("slug")
);

-- Admin activity log enhancements (extend existing activity_logs)
-- Add indexes for better performance on activity_logs
CREATE INDEX IF NOT EXISTS "activity_logs_user_id_idx" ON "activity_logs" USING btree ("user_id");
CREATE INDEX IF NOT EXISTS "activity_logs_timestamp_idx" ON "activity_logs" USING btree ("timestamp");
CREATE INDEX IF NOT EXISTS "activity_logs_action_idx" ON "activity_logs" USING btree ("action");

-- Foreign key for settings updated_by
ALTER TABLE "settings" ADD CONSTRAINT "settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;

-- Indexes for settings
CREATE INDEX "settings_key_idx" ON "settings" USING btree ("key");

-- Indexes for shipping zones
CREATE INDEX "shipping_zones_is_active_idx" ON "shipping_zones" USING btree ("is_active");

-- Indexes for email templates
CREATE INDEX "email_templates_slug_idx" ON "email_templates" USING btree ("slug");
CREATE INDEX "email_templates_is_active_idx" ON "email_templates" USING btree ("is_active");

-- Insert default settings
INSERT INTO "settings" ("key", "value", "description") VALUES
('general', '{
	"siteName": "PUXX Ireland",
	"siteLogo": "/images/logo/puxx-logo-full.svg",
	"favicon": "/images/logo/puxx-logo-icon.svg",
	"contactEmail": "hello@puxxnicotine.ie",
	"supportEmail": "support@puxxnicotine.ie",
	"phone": "+353 1 234 5678",
	"address": "Dublin, Ireland",
	"instagram": "https://instagram.com/puxxireland",
	"facebook": "https://facebook.com/puxxireland",
	"minOrderQuantity": 5,
	"freeShippingThreshold": 150
}', 'General site settings'),

('payments', '{
	"testMode": true,
	"stripeLivePublishableKey": "",
	"stripeLiveSecretKey": "",
	"stripeTestPublishableKey": "",
	"stripeTestSecretKey": "",
	"webhookSecret": "",
	"acceptedCurrencies": ["EUR"],
	"paymentMethods": ["card", "apple_pay", "google_pay"],
	"worldpayMerchantCode": "",
	"worldpayInstallationId": "",
	"worldpayXmlPassword": ""
}', 'Payment gateway configuration'),

('taxes', '{
	"enabled": true,
	"name": "VAT",
	"rate": 23,
	"display": "inclusive",
	"vatNumber": "IE1234567AB"
}', 'Tax settings');

-- Insert default shipping zone (Ireland)
INSERT INTO "shipping_zones" ("name", "countries", "methods") VALUES
('Ireland', ARRAY['IE'], '[
	{
		"name": "Standard Shipping",
		"cost": 5.99,
		"freeThreshold": 150,
		"estimatedDays": "3-5"
	},
	{
		"name": "Express Shipping",
		"cost": 9.99,
		"freeThreshold": null,
		"estimatedDays": "1-2"
	}
]'::jsonb);

-- Insert default email templates
INSERT INTO "email_templates" ("slug", "name", "subject", "html_content", "text_content", "variables") VALUES
('order-confirmation', 'Order Confirmation', 'Order Confirmation - {{orderNumber}}',
'<h1>Thank you for your order!</h1>
<p>Hi {{customerName}},</p>
<p>We have received your order <strong>{{orderNumber}}</strong> and are processing it now.</p>
<p><strong>Order Total:</strong> {{total}}</p>
<p>You will receive a shipping confirmation email once your order has been dispatched.</p>
<p>Thank you for shopping with PUXX Ireland!</p>',
'Thank you for your order! Order Number: {{orderNumber}}, Total: {{total}}',
ARRAY['{{orderNumber}}', '{{customerName}}', '{{total}}', '{{orderDate}}']),

('shipping-confirmation', 'Shipping Confirmation', 'Your Order Has Shipped - {{orderNumber}}',
'<h1>Your order is on its way!</h1>
<p>Hi {{customerName}},</p>
<p>Great news! Your order <strong>{{orderNumber}}</strong> has been shipped.</p>
<p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
<p><strong>Estimated Delivery:</strong> {{estimatedDelivery}}</p>
<p>Thank you for choosing PUXX Ireland!</p>',
'Your order has shipped! Order: {{orderNumber}}, Tracking: {{trackingNumber}}',
ARRAY['{{orderNumber}}', '{{customerName}}', '{{trackingNumber}}', '{{estimatedDelivery}}']),

('delivery-confirmation', 'Delivery Confirmation', 'Your Order Has Been Delivered - {{orderNumber}}',
'<h1>Your order has been delivered!</h1>
<p>Hi {{customerName}},</p>
<p>Your order <strong>{{orderNumber}}</strong> has been successfully delivered.</p>
<p>We hope you enjoy your PUXX products!</p>
<p>If you have any questions, please contact us at support@puxxnicotine.ie</p>',
'Your order has been delivered! Order: {{orderNumber}}',
ARRAY['{{orderNumber}}', '{{customerName}}', '{{deliveryDate}}']),

('order-cancellation', 'Order Cancellation', 'Order Cancelled - {{orderNumber}}',
'<h1>Order Cancelled</h1>
<p>Hi {{customerName}},</p>
<p>Your order <strong>{{orderNumber}}</strong> has been cancelled as requested.</p>
<p>If this was a mistake, please contact us immediately.</p>
<p><strong>Refund Amount:</strong> {{refundAmount}}</p>
<p>Refunds are typically processed within 5-7 business days.</p>',
'Order cancelled: {{orderNumber}}, Refund: {{refundAmount}}',
ARRAY['{{orderNumber}}', '{{customerName}}', '{{refundAmount}}', '{{cancellationReason}}']),

('refund-confirmation', 'Refund Confirmation', 'Refund Processed - {{orderNumber}}',
'<h1>Refund Processed</h1>
<p>Hi {{customerName}},</p>
<p>A refund has been processed for order <strong>{{orderNumber}}</strong>.</p>
<p><strong>Refund Amount:</strong> {{refundAmount}}</p>
<p>The refund will appear in your account within 5-7 business days.</p>',
'Refund processed: {{orderNumber}}, Amount: {{refundAmount}}',
ARRAY['{{orderNumber}}', '{{customerName}}', '{{refundAmount}}']),

('welcome-email', 'Welcome Email', 'Welcome to PUXX Ireland!',
'<h1>Welcome to PUXX Ireland!</h1>
<p>Hi {{customerName}},</p>
<p>Thank you for creating an account with us. We are excited to have you join the PUXX family!</p>
<p>Enjoy premium nicotine pouches delivered straight to your door.</p>
<p><strong>Your first order:</strong> Use code WELCOME10 for 10% off!</p>
<p>Start shopping at <a href="https://puxxnicotine.ie">puxxnicotine.ie</a></p>',
'Welcome to PUXX Ireland! Use code WELCOME10 for 10% off your first order.',
ARRAY['{{customerName}}', '{{email}}']),

('password-reset', 'Password Reset', 'Reset Your Password',
'<h1>Password Reset Request</h1>
<p>Hi {{customerName}},</p>
<p>We received a request to reset your password. Click the link below to create a new password:</p>
<p><a href="{{resetLink}}">Reset Password</a></p>
<p>This link will expire in 1 hour.</p>
<p>If you did not request this, please ignore this email.</p>',
'Reset your password: {{resetLink}}',
ARRAY['{{customerName}}', '{{resetLink}}', '{{email}}']);

-- =============================================
-- PUXX IRELAND - ROW LEVEL SECURITY POLICIES
-- =============================================
-- This file contains all RLS policies for the database
-- Apply these after running the initial migrations

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROFILES - Users can only access their own profile
-- =============================================

-- Select: Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid()::integer = user_id);

-- Insert: Users can create their own profile
CREATE POLICY "Users can create own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid()::integer = user_id);

-- Update: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid()::integer = user_id);

-- =============================================
-- PRODUCTS - Public read, admin write
-- =============================================

-- Select: Everyone can view active products
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT
  USING (is_active = true OR auth.uid() IS NOT NULL);

-- Insert: Only admins can create products
CREATE POLICY "Admins can create products" ON products
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- Update: Only admins can update products
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- Delete: Only admins can delete products
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- =============================================
-- CATEGORIES - Public read, admin write
-- =============================================

-- Select: Everyone can view categories
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT
  USING (true);

-- Insert: Only admins can create categories
CREATE POLICY "Admins can create categories" ON categories
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- Update: Only admins can update categories
CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- Delete: Only admins can delete categories
CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- =============================================
-- PRODUCT_CATEGORIES - Public read, admin write
-- =============================================

-- Select: Everyone can view product categories
CREATE POLICY "Anyone can view product categories" ON product_categories
  FOR SELECT
  USING (true);

-- Insert/Update/Delete: Only admins
CREATE POLICY "Admins can manage product categories" ON product_categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- =============================================
-- CART_ITEMS - Users can only access their own cart
-- =============================================

-- Select: Users can view their own cart items
CREATE POLICY "Users can view own cart" ON cart_items
  FOR SELECT
  USING (auth.uid()::integer = user_id);

-- Insert: Users can add to their own cart
CREATE POLICY "Users can add to own cart" ON cart_items
  FOR INSERT
  WITH CHECK (auth.uid()::integer = user_id);

-- Update: Users can update their own cart items
CREATE POLICY "Users can update own cart" ON cart_items
  FOR UPDATE
  USING (auth.uid()::integer = user_id);

-- Delete: Users can delete their own cart items
CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE
  USING (auth.uid()::integer = user_id);

-- =============================================
-- ORDERS - Users can view own orders, admins can view all
-- =============================================

-- Select: Users can view their own orders, admins can view all
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (
    auth.uid()::integer = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- Insert: Users can create their own orders
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT
  WITH CHECK (auth.uid()::integer = user_id);

-- Update: Users can update their own pending orders, admins can update all
CREATE POLICY "Users can update own pending orders" ON orders
  FOR UPDATE
  USING (
    (auth.uid()::integer = user_id AND status = 'pending') OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- =============================================
-- ORDER_ITEMS - Inherit from orders
-- =============================================

-- Select: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (
        orders.user_id = auth.uid()::integer OR
        EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()::integer
          AND role IN ('admin', 'manager')
        )
      )
    )
  );

-- Insert: Order items created during order creation
CREATE POLICY "Users can create order items for own orders" ON order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()::integer
    )
  );

-- =============================================
-- COUPONS - Public read for active, admin write
-- =============================================

-- Select: Everyone can view active coupons
CREATE POLICY "Anyone can view active coupons" ON coupons
  FOR SELECT
  USING (is_active = true);

-- Insert/Update/Delete: Only admins
CREATE POLICY "Admins can manage coupons" ON coupons
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role = 'admin'
    )
  );

-- =============================================
-- REVIEWS - Users can create, admins can approve
-- =============================================

-- Select: Everyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT
  USING (
    is_approved = true OR
    auth.uid()::integer = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- Insert: Logged-in users can create reviews
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT
  WITH CHECK (auth.uid()::integer = user_id);

-- Update: Users can update their own unapproved reviews, admins can update all
CREATE POLICY "Users can update own unapproved reviews" ON reviews
  FOR UPDATE
  USING (
    (auth.uid()::integer = user_id AND is_approved = false) OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- Delete: Users can delete their own reviews, admins can delete all
CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE
  USING (
    auth.uid()::integer = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- =============================================
-- NEWSLETTER_SUBSCRIBERS - Public insert, admin manage
-- =============================================

-- Select: Only admins can view subscribers
CREATE POLICY "Admins can view subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- Insert: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Update: Only admins can update (e.g., unsubscribe users)
CREATE POLICY "Admins can update subscribers" ON newsletter_subscribers
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::integer
      AND role IN ('admin', 'manager')
    )
  );

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()::integer
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is manager or admin
CREATE OR REPLACE FUNCTION is_manager_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()::integer
    AND role IN ('admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

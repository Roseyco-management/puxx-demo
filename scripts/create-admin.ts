import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createAdminUser() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const email = 'admin@puxxireland.ie';
  const password = 'PuxxAdmin123!';
  const name = 'Admin User';

  console.log('Creating admin user...');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    console.log('❌ User already exists with email:', email);
    process.exit(1);
  }

  // Create user
  const { data: newUser, error: userError } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password_hash: passwordHash,
      role: 'admin',
    })
    .select()
    .single();

  if (userError) {
    console.error('❌ Error creating user:', userError);
    process.exit(1);
  }

  console.log('✅ User created:', newUser);

  // Create profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .insert({
      user_id: newUser.id,
      age_verified: true,
      marketing_consent: false,
    })
    .select()
    .single();

  if (profileError) {
    console.error('⚠️  Warning: Could not create profile:', profileError);
  } else {
    console.log('✅ Profile created:', profile);
  }

  console.log('\n✅ Admin user created successfully!');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
  console.log('👤 Role: admin');
}

createAdminUser().catch(console.error);

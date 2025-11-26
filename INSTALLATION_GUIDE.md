# 📖 Complete Installation & Setup Guide
**Step-by-Step Instructions for Expo Supabase Starter Pro**

---

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **macOS** (for iOS development) or **Windows/Linux** (for Android)
- [ ] **Node.js 18+** installed ([download](https://nodejs.org/))
- [ ] **Bun** installed (we'll install this in Step 1)
- [ ] **Xcode** installed (for iOS development)
  - Open Xcode → Preferences → Locations → Select Command Line Tools
  - Install iOS Simulator
- [ ] **Android Studio** installed (for Android development)
  - Install Android SDK
  - Create an Android Virtual Device (AVD)
- [ ] **Supabase account** ([sign up](https://supabase.com/dashboard))
- [ ] **Git** installed (to copy the boilerplate)

---

## Step 1: Install Bun (Package Manager)

**Why Bun?** It's 30x faster than npm and fully supported by Expo SDK 54+.

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

**Expected output:** `1.x.x` or higher

---

## Step 2: Copy the Boilerplate to Your Project

```bash
# Navigate to where you want your project
cd ~/Projects  # Or your preferred directory

# Copy the boilerplate
cp -r ~/Documents/expo-supabase-starter-pro my-awesome-app

# Navigate into your new project
cd my-awesome-app
```

**Replace `my-awesome-app`** with your actual project name.

---

## Step 3: Install Dependencies

```bash
# Install all dependencies with Bun
bun install
```

This will install:
- Expo SDK 54
- Supabase client
- NativeWind
- TanStack Query
- React Hook Form + Zod
- And all other dependencies

**Expected time:** 30-60 seconds (with Bun)

---

## Step 4: Create a Supabase Project (If You Don't Have One)

### 4a. Create New Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name:** MyApp Database
   - **Database Password:** (create a strong password - SAVE THIS!)
   - **Region:** (choose closest to you)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to provision

### 4b. Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **Project API keys** → **anon public** (long string starting with `eyJ...`)
   - **Project Settings** → **General** → **Reference ID** (short string like `abcdefgh`)

**Keep these handy for the next step!**

---

## Step 5: Run the Interactive Setup CLI

This is the **magic step** that configures everything automatically!

```bash
bun run setup
```

### What the CLI Will Ask:

#### 5a. Project Name
```
Project name (leave blank for expo-app): █
```
**Enter:** Your app name (e.g., `MyAwesomeApp`)

#### 5b. Choose Theme
```
Choose a theme preset:
  1. Vercel (Dark)
  2. GitHub
  3. Stripe
  4. Minimal Light

Enter number: █
```
**Enter:** `1` (or your preference)

#### 5c. Supabase Setup
```
Supabase setup:
  1. Create new Supabase project (I'll do it manually and provide credentials)
  2. Link existing Supabase project
  3. Skip for now (configure later)

Enter number: █
```

**If you just created a project (Step 4):** Choose `2`

#### 5d. Provide Supabase Credentials

If you chose option 2:

```
Supabase Project Ref: █
```
**Paste:** Your Project Reference ID (e.g., `abcdefgh`)

The CLI will then:
- ✅ Link to your Supabase project
- ✅ Pull the database schema
- ✅ Generate TypeScript types
- ✅ Optionally pull production data
- ✅ Optionally start local Supabase

#### 5e. Additional Prompts

```
Do you have Supabase CLI installed? (y/n): █
```
**Enter:** `n` (the CLI will install it for you)

```
Pull production data for local development? (y/n): █
```
**Enter:** `n` for now (you don't have data yet)

```
Start local Supabase now? (y/n): █
```
**Enter:** `y` (this starts Docker containers for local development)

---

## Step 6: Configure Environment Variables

The CLI created a `.env` file, but let's verify it:

```bash
# Open the .env file
cat .env
```

**It should look like:**
```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**If the URL or key is empty:**

```bash
# Edit .env manually
nano .env  # or use your favorite editor

# Add:
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X` in nano)

---

## Step 7: Start the Development Server

```bash
# Start Expo
bun start
```

**You should see:**
```
Metro waiting on exp://192.168.x.x:8081

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

---

## Step 8: Run on iOS Simulator

**Make sure Xcode is installed and iOS Simulator is available.**

```bash
# In the Expo terminal, press:
i
```

**OR run directly:**
```bash
bun ios
```

### Expected Result:
- iOS Simulator opens
- App builds and launches
- You see the **Login screen** with your selected theme! 🎉

### If you see errors:
```bash
# Clear Metro cache and try again
bun start --clear
```

---

## Step 9: Run on Android Emulator (Optional)

**Make sure Android Studio is installed and an AVD is created.**

1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. In Expo terminal, press `a` or run:

```bash
bun android
```

### Expected Result:
- App builds and launches on Android emulator
- You see the Login screen

---

## Step 10: Test the Auth Flow

### Create a Test User

1. On the **Login screen**, tap **"Sign up"**
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Tap **"Create account"**
4. You'll see: **"Check your email to confirm your account"**

### Confirm Email (Development Mode)

Since Supabase requires email confirmation by default:

**Option A: Disable email confirmation (for development)**
1. Go to Supabase Dashboard → **Authentication** → **Settings**
2. Scroll to **Email Auth**
3. Toggle **OFF** "Enable email confirmations"
4. Try signing up again

**Option B: Check Supabase for confirmation**
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Find your user and manually confirm if needed

### Sign In

1. Go back to the Login screen
2. Enter your email and password
3. Tap **"Sign in"**
4. You should see the **Home screen** with a welcome message! 🎉

---

## Step 11: Verify Everything Works

### Check Authentication
- [x] Sign up works
- [x] Login works
- [x] Protected routes redirect to login
- [x] After login, you see the Home screen

### Check UI/Theme
- [x] Theme colors match your selection
- [x] Layout looks polished and professional
- [x] Dark mode toggle works (if implemented)

### Check Supabase Connection
- [x] Auth data is in Supabase Dashboard → Authentication → Users
- [x] No console errors related to Supabase

---

## Step 12: Start Building Your App!

Now you're ready to build features.

### Quick Next Steps:

**Add a new screen:**
```bash
# Create a new file
touch app/(tabs)/settings.tsx
```

**Add a database table:**
1. Go to Supabase Dashboard → **Table Editor**
2. Create a new table (e.g., `posts`)
3. Pull schema: `bun run supabase:types`

**Use AI to build features:**
```
Create a Posts screen that:
- Fetches from Supabase 'posts' table
- Uses TanStack Query
- Shows a list with FlashList
- Follows the design system in global.css
```

---

## 🎯 Verification Checklist

Before you start coding, verify:

- [x] Bun is installed (`bun --version`)
- [x] Dependencies are installed (`node_modules/` exists)
- [x] Setup CLI ran successfully
- [x] `.env` file has Supabase credentials
- [x] App runs on iOS (`bun ios`) or Android (`bun android`)
- [x] Login screen appears with your theme
- [x] You can create an account and sign in
- [x] Home screen shows after login
- [x] Supabase Dashboard shows your user

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@/lib/supabase'"

**Fix:**
```bash
# Rebuild and restart
bun start --clear
```

### Error: "Supabase URL is required"

**Fix:**
```bash
# Check .env file exists and has correct format
cat .env

# If missing, create it:
echo 'EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key' > .env
```

### Error: "Module not found: Error: Can't resolve 'react-native-web'"

**Fix:**
```bash
# Reinstall dependencies
rm -rf node_modules
bun install
```

### iOS Simulator doesn't open

**Fix:**
```bash
# Check Xcode Command Line Tools
xcode-select --install

# Or set them manually in Xcode Preferences
```

### Android build fails

**Fix:**
```bash
# Check Android SDK is installed
ls ~/Library/Android/sdk

# If missing, install via Android Studio → SDK Manager
```

### Metro bundler cache issues

**Fix:**
```bash
# Clear all caches
bun start --clear
rm -rf .expo
```

### Supabase connection fails

**Fix:**
1. Verify credentials in Supabase Dashboard
2. Check network connection
3. Ensure `.env` has `EXPO_PUBLIC_` prefix (required for Expo)

---

## 📚 Next Steps

### Learn the Stack
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [TanStack Query Guide](https://tanstack.com/query/latest/docs/framework/react/overview)
- [NativeWind Docs](https://www.nativewind.dev/)

### Build Features
- Add more routes in `app/`
- Create Supabase tables and RLS policies
- Use React Native Reusables components
- Integrate TanStack Query for data fetching

### Deploy
- Set up EAS Build: `eas build:configure`
- Build for App Store: `eas build --platform ios`
- Build for Play Store: `eas build --platform android`

---

## 🎉 Congratulations!

You now have a production-ready React Native app with:
✅ Complete authentication flow
✅ Supabase backend integration
✅ Beautiful, themeable UI
✅ Type-safe development
✅ AI coding assistant ready

**Time to build something amazing!** 🚀

---

**Questions?** Refer to the main [README.md](./README.md) or official documentation.

**Happy coding!** 👨‍💻👩‍💻

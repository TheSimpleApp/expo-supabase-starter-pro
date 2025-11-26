# ⚡ Quick Start (5 Minutes to Running App)

**The fastest way to get your app running.**

---

## 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

## 2. Copy & Install

```bash
# Copy boilerplate to your project
cp -r ~/Documents/expo-supabase-starter-pro my-app
cd my-app

# Install dependencies (30 seconds)
bun install
```

## 3. Get Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Create a project (or use existing)
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon public** key

## 4. Run Setup

```bash
bun run setup
```

**Follow the prompts:**
- Project name: `MyApp`
- Theme: `1` (Vercel Dark)
- Supabase: `2` (Link existing)
- Project ref: `[paste your ref]`
- Install Supabase CLI: `n` (auto-installs)
- Pull data: `n`
- Start local: `y`

## 5. Add Credentials to .env

```bash
# Edit .env file
nano .env

# Add:
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Save (`Ctrl+O`, `Enter`, `Ctrl+X`)

## 6. Launch

```bash
# Start dev server
bun start

# Press 'i' for iOS or 'a' for Android
# OR
bun ios
```

## 7. Test

- App opens on simulator
- You see Login screen
- Tap "Sign up" → create account
- Sign in → see Home screen

**Done!** 🎉

---

## Disable Email Confirmation (Development)

1. Supabase Dashboard → **Authentication** → **Settings**
2. Toggle **OFF** "Enable email confirmations"
3. Now signups work instantly

---

## Next Steps

- Check [README.md](./README.md) for full documentation
- See [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) for detailed steps
- Start building in `app/(tabs)/`

**Happy coding!** 🚀

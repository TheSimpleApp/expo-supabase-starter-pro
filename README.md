# 🚀 Expo Supabase Starter Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-000020.svg?style=flat&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Latest-black.svg?style=flat&logo=bun)](https://bun.sh/)

**Production-ready React Native boilerplate with Expo, Supabase, NativeWind, and React Native Reusables.**

Built with the most modern, battle-tested stack verified for November 2025.

---

## ✨ Features

✅ **Expo SDK 54** - Latest with New Architecture support
✅ **Expo Router** - File-based routing (like Next.js App Router)
✅ **Supabase** - Complete backend (Auth, Database, Storage, Realtime)
✅ **NativeWind v4** - Tailwind CSS for React Native
✅ **React Native Reusables** - shadcn/ui components for mobile
✅ **TanStack Query** - Server state management
✅ **Zustand** - Client state management
✅ **React Hook Form + Zod** - Type-safe forms with validation
✅ **TypeScript** - Strict mode with auto-generated Supabase types
✅ **Pre-built Auth Screens** - Login, Signup, Forgot Password
✅ **Global Theming** - 4 preset themes (Vercel, GitHub, Stripe, Minimal)
✅ **Interactive Setup CLI** - Guided setup with zero configuration
✅ **AI-Ready** - Includes comprehensive `.cursorrules` for AI coding assistants
✅ **Dark Mode** - Built-in support with NativeWind
✅ **Bun** - 30x faster than npm, fully supported by Expo SDK 54+

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/300x600?text=Login+Screen" alt="Login Screen" width="250"/>
  <img src="https://via.placeholder.com/300x600?text=Home+Screen" alt="Home Screen" width="250"/>
  <img src="https://via.placeholder.com/300x600?text=Profile+Screen" alt="Profile Screen" width="250"/>
</div>

*Replace these placeholders with actual screenshots*

---

## 🎯 Why This Starter?

### Complete & Production-Ready
- Not a toy example - this is how real apps are built in 2025
- Pre-configured with best practices
- No configuration needed - just run setup and start building

### Interactive Setup CLI
- Guided configuration through questions
- Auto-installs dependencies
- Connects to Supabase automatically
- Generates TypeScript types
- Creates theme and config files

### Modern Tech Stack
- **Verified Nov 2025**: All packages are latest and actively maintained
- **New Architecture**: Expo SDK 54 with full New Architecture support
- **Best Practices**: TanStack Query + Zustand (replaced Redux complexity)
- **Type Safety**: End-to-end TypeScript with auto-generated Supabase types

### AI-Optimized Development
- Comprehensive `.cursorrules` for Cursor AI / Claude Code
- AI acts as senior consultant - asks questions, proposes solutions, prevents technical debt
- Maintains design consistency automatically
- Over 1,200 lines of guidance for AI assistants

---

## 📦 Quick Start

### Prerequisites

- **Node.js** 18+ (required for Bun)
- **Bun** (recommended) or npm/pnpm/yarn
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **Supabase account** ([sign up free](https://supabase.com/dashboard))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/expo-supabase-starter-pro.git my-app
cd my-app

# 2. Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# 3. Install dependencies
bun install

# 4. Run the interactive setup (IMPORTANT!)
bun run setup
```

The **interactive setup CLI** will guide you through:
1. ✅ Choosing a project name
2. ✅ Selecting a theme (Vercel, GitHub, Stripe, Minimal)
3. ✅ Supabase setup (new or existing project)
4. ✅ Auto-generating configuration files
5. ✅ Pulling database schema and types
6. ✅ Setting up local development environment

### Launch the App

```bash
# Start Expo dev server
bun start

# Run on iOS simulator
bun ios

# Run on Android emulator
bun android
```

That's it! Your app is running with a complete auth flow and database integration. 🎉

---

## 🗄️ Supabase Setup

### Quick Setup (Recommended)

The `bun run setup` command handles everything automatically. Just have your Supabase project credentials ready:

1. Go to https://supabase.com/dashboard
2. Create a project or select existing
3. Go to **Settings** → **API**
4. Copy **Project URL**, **anon public** key, and **Project Ref**
5. Paste when prompted by setup CLI

### Manual Setup (Alternative)

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Initialize and link
supabase init
supabase link --project-ref your-project-ref

# Pull schema and generate types
supabase db pull
bun run supabase:types

# Start local Supabase (optional)
supabase start
```

---

## 🎨 Themes

Choose from 4 professionally designed themes during setup:

| Theme | Description |
|-------|-------------|
| **Vercel (Dark)** | Modern dark theme with high contrast |
| **GitHub (Light)** | Clean professional light theme |
| **Stripe** | Elegant dark theme with purple accents |
| **Minimal Light** | Ultra-minimal clean slate |

**All themes support dark mode** out of the box.

**Customize:** Edit `global.css` to modify colors and design tokens.

---

## 📁 Project Structure

```
my-app/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth screens group
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                   # Protected main app
│   │   ├── index.tsx             # Home screen
│   │   ├── profile.tsx
│   │   └── _layout.tsx
│   └── _layout.tsx               # Root layout (providers)
│
├── components/
│   ├── ui/                       # React Native Reusables (shadcn)
│   └── custom/                   # Your custom components
│
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── useAuth.tsx              # Auth context/hook
│   └── utils.ts                 # Utilities (cn helper)
│
├── types/
│   └── supabase.ts              # Auto-generated Supabase types
│
├── scripts/
│   └── setup.ts                 # Interactive setup CLI
│
├── supabase/
│   ├── migrations/              # Database migrations
│   └── seed.sql                 # Seed data for local dev
│
├── global.css                   # Theme design tokens
├── .cursorrules                 # AI coding assistant rules
└── README.md
```

---

## 🛠️ Available Scripts

```bash
# Development
bun start              # Start Expo dev server
bun ios               # Run on iOS simulator
bun android           # Run on Android emulator
bun web               # Run on web

# Setup
bun run setup         # Run interactive setup CLI

# Supabase
bun supabase:start    # Start local Supabase
bun supabase:stop     # Stop local Supabase
bun supabase:types    # Regenerate TypeScript types
bun supabase:reset    # Reset local database

# Code Quality
bun lint              # Run ESLint
bun format            # Format code with Prettier
```

---

## 🤖 AI-Assisted Development

This starter includes a **comprehensive `.cursorrules` file** (1,200+ lines) that transforms AI coding assistants into professional React Native consultants.

### What It Does

The AI will:
- ✅ Ask clarifying questions when requirements are ambiguous
- ✅ Recommend best packages from the Expo ecosystem
- ✅ Check compatibility with your existing setup
- ✅ Suggest optimizations and prevent technical debt
- ✅ Offer multiple solutions with trade-offs

### Example

**You:** "Make it faster"

**AI:** "I can help optimize performance! To give you the best solution:
1. Which part feels slow? (startup, navigation, scrolling, API calls, images)
2. On which platform? (iOS, Android, both)
3. What's your target? (60fps, sub-second loads, instant interactions)

Let me know and I'll implement specific optimizations."

### Supported AI Assistants

- **Cursor AI** - Automatically loads `.cursorrules`
- **Claude Code** - References `.cursorrules` for context
- **GitHub Copilot** - Use as reference for prompts

---

## 📚 Documentation

- **[README.md](./README.md)** - This file (overview and quick start)
- **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - Detailed step-by-step setup
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute quick start guide
- **[.cursorrules](./.cursorrules)** - AI coding assistant rules

---

## 🎓 Tech Stack

### Core
- [Expo SDK 54](https://expo.dev/) - React Native framework
- [Expo Router v6](https://docs.expo.dev/router/introduction/) - File-based routing
- [TypeScript 5.7+](https://www.typescriptlang.org/) - Type safety
- [Bun](https://bun.sh/) - Fast package manager & runtime

### Backend
- [Supabase](https://supabase.com/) - Auth, Database, Storage, Realtime
- [Supabase JS Client](https://supabase.com/docs/reference/javascript) - JavaScript client

### Styling & UI
- [NativeWind v4](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [React Native Reusables](https://reactnativereusables.com/) - shadcn/ui for mobile
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) - Optimized images

### State Management
- [TanStack Query v5](https://tanstack.com/query/latest) - Server state
- [Zustand v5](https://docs.pmnd.rs/zustand) - Client state

### Forms & Validation
- [React Hook Form v7](https://react-hook-form.com/) - Form handling
- [Zod v3](https://zod.dev/) - Schema validation

### Performance
- [@shopify/flash-list](https://shopify.github.io/flash-list/) - 60fps lists
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations

---

## 🔐 Environment Variables

Create a `.env` file in your project root:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Project Configuration
EXPO_PUBLIC_PROJECT_NAME=MyApp
```

**Note:** Never commit `.env` to git. Use `.env.example` as a template.

---

## 🧩 Adding Components

React Native Reusables (shadcn/ui for React Native):

```bash
# Add individual components
npx @react-native-reusables/cli@latest add button
npx @react-native-reusables/cli@latest add input
npx @react-native-reusables/cli@latest add card

# Components are added to components/ui/
```

**Usage:**

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<Button onPress={handlePress}>
  <Text>Click me</Text>
</Button>
```

---

## 🚀 Deployment

### Using EAS (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This starter is built on top of amazing open-source projects:

- [Expo](https://expo.dev/) - The fastest way to build React Native apps
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [React Native Reusables](https://reactnativereusables.com/) - shadcn/ui for mobile
- [TanStack Query](https://tanstack.com/query/latest) - Powerful data synchronization
- [Zustand](https://docs.pmnd.rs/zustand) - Simple state management

---

## 📮 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/expo-supabase-starter-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/expo-supabase-starter-pro/discussions)
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

---

## 🗺️ Roadmap

- [ ] Add more theme presets
- [ ] Add E2E testing with Detox
- [ ] Add internationalization (i18n)
- [ ] Add push notifications example
- [ ] Add offline-first capabilities
- [ ] Add payment integration examples (Stripe, RevenueCat)
- [ ] Add social auth examples (Google, Apple, GitHub)
- [ ] Add analytics integration examples

---

## ⭐ Star History

If you find this starter helpful, please consider giving it a star! It helps others discover the project.

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/expo-supabase-starter-pro&type=Date)](https://star-history.com/#yourusername/expo-supabase-starter-pro&Date)

---

## 💬 FAQ

### Q: Can I use npm/yarn/pnpm instead of Bun?

**A:** Yes! While Bun is recommended for speed (30x faster than npm), you can use any package manager. Just run `npm install` or `yarn install` instead.

### Q: Do I need to eject from Expo?

**A:** No! This starter uses the managed workflow. You only need to prebuild (`npx expo prebuild`) if you add native modules that aren't supported by Expo.

### Q: Can I use this for production apps?

**A:** Absolutely! This starter is production-ready and follows all best practices. Many apps built with this stack are in production.

### Q: How do I update Supabase types after schema changes?

**A:** Run `bun run supabase:types` to regenerate types from your database schema.

### Q: Can I use this starter commercially?

**A:** Yes! It's MIT licensed, so you can use it for personal or commercial projects.

---

<div align="center">

**Built with ❤️ using Expo, Supabase, and NativeWind**

**[⬆ Back to Top](#-expo-supabase-starter-pro)**

</div>

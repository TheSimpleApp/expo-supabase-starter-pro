#!/usr/bin/env bun

/**
 * Interactive Setup Script for Expo Supabase Starter Pro
 *
 * This script handles:
 * - Project name configuration
 * - Theme selection
 * - Supabase setup (new or existing)
 * - Environment configuration
 * - Type generation
 */

import { $ } from 'bun';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// ANSI color codes for beautiful CLI output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

const c = (color: keyof typeof colors, text: string) => `${colors[color]}${text}${colors.reset}`;

// ASCII Art Banner
const banner = `
${c('cyan', '╔════════════════════════════════════════════════════════╗')}
${c('cyan', '║')}  ${c('bright', '🚀 Expo + Supabase Starter Pro')}                     ${c('cyan', '║')}
${c('cyan', '║')}  ${c('green', 'Production-Ready React Native Boilerplate')}         ${c('cyan', '║')}
${c('cyan', '╚════════════════════════════════════════════════════════╝')}
`;

console.log(banner);

// Helper to prompt user input
async function prompt(question: string): Promise<string> {
  process.stdout.write(c('yellow', `\n${question}: `));
  const buf = new Uint8Array(1024);
  const n = await Bun.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
}

// Helper to prompt yes/no
async function promptYesNo(question: string): Promise<boolean> {
  const answer = await prompt(`${question} (y/n)`);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

// Helper to select from options
async function select(question: string, options: string[]): Promise<number> {
  console.log(c('yellow', `\n${question}`));
  options.forEach((opt, i) => {
    console.log(c('cyan', `  ${i + 1}. ${opt}`));
  });
  const answer = await prompt('Enter number');
  const num = parseInt(answer);
  if (num >= 1 && num <= options.length) {
    return num - 1;
  }
  console.log(c('red', 'Invalid selection, using first option.'));
  return 0;
}

// Theme presets
const themes = {
  vercel: {
    name: 'Vercel (Dark)',
    colors: {
      background: '0 0% 0%',
      foreground: '0 0% 100%',
      primary: '0 0% 100%',
      primaryForeground: '0 0% 0%',
      secondary: '0 0% 10%',
      secondaryForeground: '0 0% 100%',
      muted: '0 0% 10%',
      mutedForeground: '0 0% 60%',
      accent: '0 0% 15%',
      accentForeground: '0 0% 100%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 100%',
      border: '0 0% 20%',
      input: '0 0% 20%',
      ring: '0 0% 100%',
    },
  },
  github: {
    name: 'GitHub',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%',
      secondaryForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '222.2 84% 4.9%',
    },
  },
  stripe: {
    name: 'Stripe',
    colors: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '263.4 70% 50.4%',
      primaryForeground: '0 0% 100%',
      secondary: '240 3.7% 15.9%',
      secondaryForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%',
      mutedForeground: '240 5% 64.9%',
      accent: '240 3.7% 15.9%',
      accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 98%',
      border: '240 3.7% 15.9%',
      input: '240 3.7% 15.9%',
      ring: '263.4 70% 50.4%',
    },
  },
  minimal: {
    name: 'Minimal Light',
    colors: {
      background: '0 0% 100%',
      foreground: '0 0% 3.9%',
      primary: '0 0% 9%',
      primaryForeground: '0 0% 98%',
      secondary: '0 0% 96.1%',
      secondaryForeground: '0 0% 9%',
      muted: '0 0% 96.1%',
      mutedForeground: '0 0% 45.1%',
      accent: '0 0% 96.1%',
      accentForeground: '0 0% 9%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 98%',
      border: '0 0% 89.8%',
      input: '0 0% 89.8%',
      ring: '0 0% 3.9%',
    },
  },
};

type ThemeKey = keyof typeof themes;

async function main() {
  console.log(c('bright', '\n📦 Step 1: Project Configuration\n'));

  const projectName = await prompt('Project name (leave blank for expo-app)') || 'expo-app';

  console.log(c('bright', '\n🎨 Step 2: Select Theme\n'));
  const themeIndex = await select(
    'Choose a theme preset:',
    Object.keys(themes).map(k => themes[k as ThemeKey].name)
  );
  const selectedTheme = Object.keys(themes)[themeIndex] as ThemeKey;

  console.log(c('bright', '\n🗄️  Step 3: Supabase Setup\n'));
  const supabaseChoice = await select(
    'Supabase setup:',
    [
      'Create new Supabase project (I\'ll do it manually and provide credentials)',
      'Link existing Supabase project',
      'Skip for now (configure later)',
    ]
  );

  let supabaseUrl = '';
  let supabaseAnonKey = '';
  let supabaseProjectRef = '';

  if (supabaseChoice === 0) {
    console.log(c('cyan', '\n→ Please create a project at https://supabase.com/dashboard'));
    console.log(c('cyan', '→ Then provide the credentials below:'));
    supabaseUrl = await prompt('Supabase URL');
    supabaseAnonKey = await prompt('Supabase Anon Key');
    supabaseProjectRef = await prompt('Supabase Project Ref');
  } else if (supabaseChoice === 1) {
    supabaseProjectRef = await prompt('Supabase Project Ref');
    console.log(c('cyan', '\n→ Linking to existing project...'));
  }

  // Create configuration
  console.log(c('bright', '\n⚙️  Step 4: Generating Configuration Files\n'));

  // Create .env file
  const envContent = `# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=${supabaseUrl || 'your-supabase-url'}
EXPO_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey || 'your-anon-key'}

# Project Configuration
EXPO_PUBLIC_PROJECT_NAME=${projectName}
`;

  writeFileSync('.env', envContent);
  console.log(c('green', '✓ Created .env file'));

  // Create .env.example
  const envExampleContent = `# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Project Configuration
EXPO_PUBLIC_PROJECT_NAME=expo-app
`;

  writeFileSync('.env.example', envExampleContent);
  console.log(c('green', '✓ Created .env.example file'));

  // Generate global.css with selected theme
  const theme = themes[selectedTheme];
  const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: ${theme.colors.background};
  --foreground: ${theme.colors.foreground};
  --primary: ${theme.colors.primary};
  --primary-foreground: ${theme.colors.primaryForeground};
  --secondary: ${theme.colors.secondary};
  --secondary-foreground: ${theme.colors.secondaryForeground};
  --muted: ${theme.colors.muted};
  --muted-foreground: ${theme.colors.mutedForeground};
  --accent: ${theme.colors.accent};
  --accent-foreground: ${theme.colors.accentForeground};
  --destructive: ${theme.colors.destructive};
  --destructive-foreground: ${theme.colors.destructiveForeground};
  --border: ${theme.colors.border};
  --input: ${theme.colors.input};
  --ring: ${theme.colors.ring};
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
`;

  writeFileSync('global.css', globalCss);
  console.log(c('green', `✓ Created global.css with ${theme.name} theme`));

  // Handle Supabase setup
  if (supabaseChoice === 1 && supabaseProjectRef) {
    console.log(c('bright', '\n🔗 Step 5: Setting up Supabase\n'));

    const hasSupabaseCli = await promptYesNo('Do you have Supabase CLI installed?');

    if (!hasSupabaseCli) {
      console.log(c('yellow', '\n→ Installing Supabase CLI...'));
      try {
        await $`brew install supabase/tap/supabase`;
        console.log(c('green', '✓ Supabase CLI installed'));
      } catch (error) {
        console.log(c('red', '✗ Failed to install Supabase CLI'));
        console.log(c('yellow', '→ Please install manually: brew install supabase/tap/supabase'));
      }
    }

    try {
      // Initialize Supabase
      console.log(c('cyan', '\n→ Initializing Supabase...'));
      await $`supabase init`;
      console.log(c('green', '✓ Supabase initialized'));

      // Link to project
      console.log(c('cyan', '\n→ Linking to Supabase project...'));
      await $`supabase link --project-ref ${supabaseProjectRef}`;
      console.log(c('green', '✓ Linked to Supabase project'));

      // Pull schema
      console.log(c('cyan', '\n→ Pulling database schema...'));
      await $`supabase db pull`;
      console.log(c('green', '✓ Schema pulled'));

      // Pull data
      const pullData = await promptYesNo('Pull production data for local development?');
      if (pullData) {
        console.log(c('cyan', '\n→ Pulling production data...'));
        await $`supabase db dump --data-only -f supabase/seed.sql`;
        console.log(c('green', '✓ Data pulled to supabase/seed.sql'));
      }

      // Generate types
      console.log(c('cyan', '\n→ Generating TypeScript types...'));
      if (!existsSync('types')) {
        mkdirSync('types');
      }
      await $`supabase gen types typescript --local > types/supabase.ts`;
      console.log(c('green', '✓ TypeScript types generated'));

      // Start local Supabase
      const startLocal = await promptYesNo('Start local Supabase now?');
      if (startLocal) {
        console.log(c('cyan', '\n→ Starting local Supabase...'));
        await $`supabase start`;
        console.log(c('green', '✓ Local Supabase started'));
      }
    } catch (error) {
      console.log(c('red', '\n✗ Error during Supabase setup'));
      console.log(c('yellow', '→ You can run these commands manually later:'));
      console.log(c('cyan', '  supabase init'));
      console.log(c('cyan', `  supabase link --project-ref ${supabaseProjectRef}`));
      console.log(c('cyan', '  supabase db pull'));
      console.log(c('cyan', '  supabase gen types typescript --local > types/supabase.ts'));
    }
  }

  // Final summary
  console.log(c('bright', '\n✨ Setup Complete!\n'));
  console.log(c('green', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(c('bright', '📱 Next Steps:\n'));
  console.log(c('cyan', '  1. Review your .env file and add any missing credentials'));
  console.log(c('cyan', '  2. Run: bun ios (or bun android)'));
  console.log(c('cyan', '  3. Start building your app!\n'));
  console.log(c('bright', '📚 Useful Commands:\n'));
  console.log(c('yellow', '  bun start          '), '- Start Expo dev server');
  console.log(c('yellow', '  bun ios            '), '- Run on iOS simulator');
  console.log(c('yellow', '  bun android        '), '- Run on Android emulator');
  console.log(c('yellow', '  bun supabase:types '), '- Regenerate Supabase types');
  console.log(c('yellow', '  bun supabase:start '), '- Start local Supabase');
  console.log(c('green', '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(c('magenta', '💡 Tip: '), 'Check the README.md for detailed documentation');
  console.log(c('magenta', '🎨 Theme: '), `Using ${theme.name} - Edit global.css to customize\n`);
}

// Run the setup
main().catch((error) => {
  console.error(c('red', '\n❌ Setup failed:'), error);
  process.exit(1);
});

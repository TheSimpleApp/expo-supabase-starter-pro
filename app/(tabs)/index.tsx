import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  // Extract first name from email or use 'there'
  const firstName = user?.email?.split('@')[0] || 'there';
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        <View className="px-6 pt-12 pb-8">
          <Text className="text-4xl font-bold text-foreground mb-3">
            Welcome back,{'\n'}{displayName}! 👋
          </Text>
          <Text className="text-base text-muted-foreground">
            You're all set up and ready to build something amazing
          </Text>
        </View>

        {/* Quick Stats Cards */}
        <View className="px-6 mb-6">
          <View className="flex-row space-x-3">
            {/* Stat Card 1 */}
            <View className="flex-1 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <Text className="text-2xl font-bold text-primary mb-1">✓</Text>
              <Text className="text-sm font-medium text-foreground">Authenticated</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">Signed in securely</Text>
            </View>

            {/* Stat Card 2 */}
            <View className="flex-1 bg-secondary border border-border rounded-lg p-4">
              <Text className="text-2xl font-bold text-foreground mb-1">🚀</Text>
              <Text className="text-sm font-medium text-foreground">Ready to go</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">Start building now</Text>
            </View>
          </View>
        </View>

        {/* Account Info Card */}
        <View className="px-6 mb-6">
          <View className="bg-secondary border border-border rounded-lg p-5">
            <Text className="text-sm font-semibold text-foreground mb-3">Your Account</Text>

            <View className="space-y-2.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted-foreground">Email</Text>
                <Text className="text-sm font-medium text-foreground">{user?.email}</Text>
              </View>

              <View className="h-px bg-border" />

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted-foreground">Status</Text>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <Text className="text-sm font-medium text-foreground">Active</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Getting Started Section */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Get Started</Text>

          <View className="space-y-3">
            {/* Card 1 */}
            <View className="bg-background border border-border rounded-lg p-4">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                  <Text className="text-lg">📝</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground mb-1">
                    Customize Your Profile
                  </Text>
                  <Text className="text-sm text-muted-foreground mb-3">
                    Add your name, photo, and personal information
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push('/(tabs)/profile')}
                    className="self-start px-4 py-2 bg-primary rounded-lg"
                  >
                    <Text className="text-sm font-medium text-primary-foreground">Go to Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Card 2 */}
            <View className="bg-background border border-border rounded-lg p-4">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-secondary rounded-full items-center justify-center mr-4">
                  <Text className="text-lg">💻</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground mb-1">
                    Start Building
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Edit this screen at{' '}
                    <Text className="font-mono text-xs">app/(tabs)/index.tsx</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Card 3 */}
            <View className="bg-background border border-border rounded-lg p-4">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-secondary rounded-full items-center justify-center mr-4">
                  <Text className="text-lg">📚</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground mb-1">
                    Explore Documentation
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Check out README.md for guides and best practices
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tech Stack Info */}
        <View className="px-6">
          <Text className="text-xl font-bold text-foreground mb-4">Built With</Text>

          <View className="bg-secondary border border-border rounded-lg p-5">
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                <Text className="text-sm text-foreground">Expo SDK 54 + Expo Router</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                <Text className="text-sm text-foreground">Supabase (Auth, Database, Storage)</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                <Text className="text-sm text-foreground">NativeWind v4 (Tailwind CSS)</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                <Text className="text-sm text-foreground">React Native Reusables</Text>
              </View>

              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                <Text className="text-sm text-foreground">TanStack Query + Zustand</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="px-6 pt-8">
          <Text className="text-center text-xs text-muted-foreground">
            Built with ❤️ using Expo, Supabase, and NativeWind
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

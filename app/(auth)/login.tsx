import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-foreground mb-2">
            Welcome back
          </Text>
          <Text className="text-muted-foreground text-lg">
            Sign in to your account
          </Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
            <TextInput
              className="bg-background border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="you@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
            <TextInput
              className="bg-background border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Link href="/(auth)/forgot-password" asChild>
            <Pressable>
              <Text className="text-primary text-sm text-right">
                Forgot password?
              </Text>
            </Pressable>
          </Link>

          <Pressable
            className={cn(
              'bg-primary rounded-lg py-4 items-center',
              loading && 'opacity-50'
            )}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </Pressable>

          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Text className="text-muted-foreground">Don't have an account?</Text>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text className="text-primary font-semibold">Sign up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

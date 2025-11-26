import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email to confirm your account');
      router.replace('/(auth)/login');
    }
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-foreground mb-2">
            Create account
          </Text>
          <Text className="text-muted-foreground text-lg">
            Get started with your new account
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
            <Text className="text-muted-foreground text-xs mt-1">
              Must be at least 8 characters
            </Text>
          </View>

          <Pressable
            className={cn(
              'bg-primary rounded-lg py-4 items-center mt-4',
              loading && 'opacity-50'
            )}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {loading ? 'Creating account...' : 'Create account'}
            </Text>
          </Pressable>

          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Text className="text-muted-foreground">Already have an account?</Text>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text className="text-primary font-semibold">Sign in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

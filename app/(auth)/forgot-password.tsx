import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleResetPassword() {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <View className="flex-1 bg-background justify-center px-6">
        <View className="items-center">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Check your email
          </Text>
          <Text className="text-muted-foreground text-center mb-8">
            We've sent a password reset link to {email}
          </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable className="bg-primary rounded-lg py-3 px-8">
              <Text className="text-primary-foreground font-semibold">
                Back to login
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-foreground mb-2">
            Reset password
          </Text>
          <Text className="text-muted-foreground text-lg">
            Enter your email to receive a reset link
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

          <Pressable
            className={cn(
              'bg-primary rounded-lg py-4 items-center',
              loading && 'opacity-50'
            )}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {loading ? 'Sending...' : 'Send reset link'}
            </Text>
          </Pressable>

          <Link href="/(auth)/login" asChild>
            <Pressable className="mt-4">
              <Text className="text-primary text-center">
                Back to login
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

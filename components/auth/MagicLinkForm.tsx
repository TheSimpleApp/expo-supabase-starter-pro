import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { supabase } from '@/lib/supabase';

interface MagicLinkFormProps {
  onSuccess?: () => void;
}

export function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSendMagicLink() {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: Platform.select({
            ios: 'com.yourapp://login-callback',
            android: 'com.yourapp://login-callback',
            web: `${window.location?.origin}/login-callback`,
          }),
        },
      });

      if (error) throw error;

      setSent(true);
      onSuccess?.();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <View className="bg-secondary border border-border rounded-lg p-6">
        <View className="items-center mb-4">
          <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">📧</Text>
          </View>
          <Text className="text-lg font-semibold text-foreground mb-2">Check your email</Text>
          <Text className="text-sm text-muted-foreground text-center">
            We sent a magic link to{'\n'}
            <Text className="font-medium text-foreground">{email}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setSent(false)}
          className="mt-4 border border-border rounded-lg py-2.5 px-4"
        >
          <Text className="text-center text-sm text-foreground">Use a different email</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="space-y-4">
      <View>
        <Text className="mb-2 text-sm font-medium text-foreground">Email</Text>
        <TextInput
          className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
          placeholder="you@example.com"
          placeholderTextColor="hsl(var(--muted-foreground))"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        onPress={handleSendMagicLink}
        disabled={loading}
        className="bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
      >
        {loading ? (
          <ActivityIndicator color="hsl(var(--primary-foreground))" />
        ) : (
          <Text className="text-center font-semibold text-primary-foreground">
            Send Magic Link
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-xs text-muted-foreground text-center">
        We'll email you a magic link for a password-free sign in
      </Text>
    </View>
  );
}

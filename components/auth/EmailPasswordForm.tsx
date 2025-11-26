import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

interface EmailPasswordFormProps {
  mode: 'sign-in' | 'sign-up';
  onSuccess?: () => void;
}

export function EmailPasswordForm({ mode, onSuccess }: EmailPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'sign-up') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user && !data.session) {
          // Email confirmation required
          Alert.alert(
            'Check your email',
            'We sent you a confirmation email. Please verify your email address to continue.',
            [{ text: 'OK', onPress: () => router.replace('/(auth)/sign-in') }]
          );
        } else {
          // Auto sign-in successful
          onSuccess?.();
          router.replace('/(tabs)');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        onSuccess?.();
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="space-y-4">
      {/* Email Input */}
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

      {/* Password Input */}
      <View>
        <Text className="mb-2 text-sm font-medium text-foreground">Password</Text>
        <TextInput
          className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
          placeholder="••••••••"
          placeholderTextColor="hsl(var(--muted-foreground))"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
      </View>

      {/* Forgot Password Link (Sign In only) */}
      {mode === 'sign-in' && (
        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgot-password')}
          disabled={loading}
          className="self-end"
        >
          <Text className="text-sm text-primary">Forgot password?</Text>
        </TouchableOpacity>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="mt-2 bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
      >
        {loading ? (
          <ActivityIndicator color="hsl(var(--primary-foreground))" />
        ) : (
          <Text className="text-center font-semibold text-primary-foreground">
            {mode === 'sign-up' ? 'Create Account' : 'Sign In'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Min requirements hint for sign up */}
      {mode === 'sign-up' && (
        <Text className="text-xs text-muted-foreground text-center mt-2">
          Password must be at least 6 characters
        </Text>
      )}
    </View>
  );
}

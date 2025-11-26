import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleResetPassword() {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'com.yourapp://reset-password',
      });

      if (error) throw error;

      setSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar barStyle="dark-content" />

        <View className="flex-1 px-6 pt-12">
          {/* Header */}
          <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Text className="text-primary text-base">← Back</Text>
          </TouchableOpacity>

          {/* Success Message */}
          <View className="items-center mt-12">
            <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">📧</Text>
            </View>

            <Text className="text-2xl font-bold text-foreground mb-3 text-center">
              Check your email
            </Text>

            <Text className="text-base text-muted-foreground text-center mb-8 px-4">
              We sent a password reset link to{'\n'}
              <Text className="font-medium text-foreground">{email}</Text>
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/(auth)/sign-in')}
              className="bg-primary rounded-lg py-3.5 px-8"
            >
              <Text className="text-center font-semibold text-primary-foreground">
                Back to Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSent(false);
                setEmail('');
              }}
              className="mt-4 border border-border rounded-lg py-3 px-8"
            >
              <Text className="text-center text-sm text-foreground">Use a different email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 px-6 pt-12">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-8">
          <Text className="text-primary text-base">← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground">Reset password</Text>
          <Text className="mt-2 text-base text-muted-foreground">
            Enter your email and we'll send you a link to reset your password
          </Text>
        </View>

        {/* Email Input */}
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

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            disabled={loading}
            className="mt-2 bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
          >
            {loading ? (
              <ActivityIndicator color="hsl(var(--primary-foreground))" />
            ) : (
              <Text className="text-center font-semibold text-primary-foreground">
                Send Reset Link
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

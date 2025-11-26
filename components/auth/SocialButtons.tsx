import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

interface SocialButtonsProps {
  providers: Array<'google' | 'apple'>;
  onSuccess?: () => void;
}

export function SocialButtons({ providers, onSuccess }: SocialButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setLoading('google');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: Platform.select({
            ios: 'com.yourapp://login-callback',
            android: 'com.yourapp://login-callback',
            web: `${window.location.origin}/login-callback`,
          }),
        },
      });

      if (error) throw error;

      // On mobile, this will open a browser
      // The user will be redirected back to the app after auth
      onSuccess?.();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(null);
    }
  }

  async function handleAppleSignIn() {
    setLoading('apple');

    try {
      // Generate nonce for security
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );

      // Trigger Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      // Exchange Apple credential with Supabase
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken!,
        nonce: nonce,
      });

      if (error) throw error;

      onSuccess?.();
      router.replace('/(tabs)');
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        // User canceled Apple Sign in
        return;
      }
      Alert.alert('Error', error.message || 'Failed to sign in with Apple');
    } finally {
      setLoading(null);
    }
  }

  return (
    <View className="space-y-3">
      {/* Google Sign In */}
      {providers.includes('google') && (
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          disabled={!!loading}
          className="flex-row items-center justify-center border border-border rounded-lg py-3 px-4 active:opacity-80 disabled:opacity-50"
        >
          {loading === 'google' ? (
            <ActivityIndicator size="small" color="hsl(var(--foreground))" />
          ) : (
            <>
              {/* Google Icon */}
              <View className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </View>
              <Text className="font-medium text-foreground">Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Apple Sign In (iOS only) */}
      {providers.includes('apple') && Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={8}
          style={{ width: '100%', height: 48 }}
          onPress={handleAppleSignIn}
        />
      )}

      {/* Apple Sign In fallback for Android/Web */}
      {providers.includes('apple') && Platform.OS !== 'ios' && (
        <TouchableOpacity
          onPress={handleAppleSignIn}
          disabled={!!loading}
          className="flex-row items-center justify-center bg-black rounded-lg py-3 px-4 active:opacity-80 disabled:opacity-50"
        >
          {loading === 'apple' ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              {/* Apple Icon */}
              <View className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </View>
              <Text className="font-medium text-white">Continue with Apple</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

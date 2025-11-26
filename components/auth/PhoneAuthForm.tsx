import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

interface PhoneAuthFormProps {
  onSuccess?: () => void;
}

export function PhoneAuthForm({ onSuccess }: PhoneAuthFormProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  async function handleSendOTP() {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Basic phone validation (should start with +)
    if (!phone.startsWith('+')) {
      Alert.alert('Error', 'Phone number must include country code (e.g., +1234567890)');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.trim(),
      });

      if (error) throw error;

      setOtpSent(true);
      Alert.alert('Success', 'OTP sent to your phone');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP() {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP code');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone.trim(),
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      onSuccess?.();
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid OTP code');
    } finally {
      setLoading(false);
    }
  }

  if (otpSent) {
    return (
      <View className="space-y-4">
        <View className="bg-secondary border border-border rounded-lg p-4 mb-2">
          <Text className="text-sm text-muted-foreground text-center">
            Enter the 6-digit code sent to{'\n'}
            <Text className="font-medium text-foreground">{phone}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View>
          <Text className="mb-2 text-sm font-medium text-foreground">Verification Code</Text>
          <TextInput
            className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground text-center text-2xl tracking-widest"
            placeholder="000000"
            placeholderTextColor="hsl(var(--muted-foreground))"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerifyOTP}
          disabled={loading}
          className="bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
        >
          {loading ? (
            <ActivityIndicator color="hsl(var(--primary-foreground))" />
          ) : (
            <Text className="text-center font-semibold text-primary-foreground">Verify Code</Text>
          )}
        </TouchableOpacity>

        {/* Resend / Change Number */}
        <View className="flex-row justify-center space-x-4 pt-2">
          <TouchableOpacity onPress={handleSendOTP} disabled={loading}>
            <Text className="text-sm text-primary">Resend code</Text>
          </TouchableOpacity>
          <Text className="text-sm text-muted-foreground">•</Text>
          <TouchableOpacity onPress={() => setOtpSent(false)} disabled={loading}>
            <Text className="text-sm text-primary">Change number</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="space-y-4">
      {/* Phone Input */}
      <View>
        <Text className="mb-2 text-sm font-medium text-foreground">Phone Number</Text>
        <TextInput
          className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
          placeholder="+1 (555) 123-4567"
          placeholderTextColor="hsl(var(--muted-foreground))"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={!loading}
        />
        <Text className="mt-1.5 text-xs text-muted-foreground">
          Include country code (e.g., +1 for US)
        </Text>
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity
        onPress={handleSendOTP}
        disabled={loading}
        className="bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
      >
        {loading ? (
          <ActivityIndicator color="hsl(var(--primary-foreground))" />
        ) : (
          <Text className="text-center font-semibold text-primary-foreground">Send Code</Text>
        )}
      </TouchableOpacity>

      <Text className="text-xs text-muted-foreground text-center">
        We'll send you a verification code via SMS
      </Text>
    </View>
  );
}

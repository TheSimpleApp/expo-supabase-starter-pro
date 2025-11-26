import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/profile/Avatar';

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    full_name: null,
    avatar_url: null,
    website: null,
  });

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url, website')
        .eq('id', user!.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned (profile doesn't exist yet)
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setUpdating(true);

      const updates = {
        id: user!.id,
        username: profile.username,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        website: profile.website,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  }

  async function handleSignOut() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/sign-in');
        },
      },
    ]);
  }

  async function handleDeleteAccount() {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Note: You'll need to create a Supabase Edge Function or RPC function
              // to properly delete user accounts with RLS policies
              Alert.alert(
                'Not Implemented',
                'Account deletion requires additional server-side setup. Please contact support.'
              );
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete account');
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="hsl(var(--primary))" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground">Profile</Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Manage your account settings
          </Text>
        </View>

        {/* Avatar Section */}
        <View className="px-6 py-8 items-center">
          <Avatar
            url={profile.avatar_url}
            size={120}
            onUpload={(filePath) => {
              setProfile({ ...profile, avatar_url: filePath });
              updateProfile();
            }}
          />
        </View>

        {/* Profile Form */}
        <View className="px-6 space-y-5">
          {/* Email (Read-only) */}
          <View>
            <Text className="mb-2 text-sm font-medium text-foreground">Email</Text>
            <View className="px-4 py-3 bg-secondary border border-border rounded-lg">
              <Text className="text-foreground">{user?.email}</Text>
            </View>
            <Text className="mt-1.5 text-xs text-muted-foreground">
              Email cannot be changed
            </Text>
          </View>

          {/* Full Name */}
          <View>
            <Text className="mb-2 text-sm font-medium text-foreground">Full Name</Text>
            <TextInput
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground"
              placeholder="John Doe"
              placeholderTextColor="hsl(var(--muted-foreground))"
              value={profile.full_name || ''}
              onChangeText={(text) => setProfile({ ...profile, full_name: text })}
            />
          </View>

          {/* Username */}
          <View>
            <Text className="mb-2 text-sm font-medium text-foreground">Username</Text>
            <TextInput
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground"
              placeholder="johndoe"
              placeholderTextColor="hsl(var(--muted-foreground))"
              value={profile.username || ''}
              onChangeText={(text) => setProfile({ ...profile, username: text })}
              autoCapitalize="none"
            />
          </View>

          {/* Website */}
          <View>
            <Text className="mb-2 text-sm font-medium text-foreground">Website</Text>
            <TextInput
              className="px-4 py-3 bg-background border border-border rounded-lg text-foreground"
              placeholder="https://example.com"
              placeholderTextColor="hsl(var(--muted-foreground))"
              value={profile.website || ''}
              onChangeText={(text) => setProfile({ ...profile, website: text })}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity
            onPress={updateProfile}
            disabled={updating}
            className="mt-2 bg-primary rounded-lg py-3.5 px-4 active:opacity-80 disabled:opacity-50"
          >
            {updating ? (
              <ActivityIndicator color="hsl(var(--primary-foreground))" />
            ) : (
              <Text className="text-center font-semibold text-primary-foreground">
                Update Profile
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="px-6 my-8">
          <View className="h-px bg-border" />
        </View>

        {/* Account Actions */}
        <View className="px-6 space-y-3">
          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="border border-border rounded-lg py-3.5 px-4 active:opacity-70"
          >
            <Text className="text-center font-semibold text-foreground">Sign Out</Text>
          </TouchableOpacity>

          {/* Delete Account Button */}
          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="bg-destructive/10 border border-destructive rounded-lg py-3.5 px-4 active:opacity-70"
          >
            <Text className="text-center font-semibold text-destructive">Delete Account</Text>
          </TouchableOpacity>

          <Text className="text-xs text-muted-foreground text-center pt-2">
            Account deletion is permanent and cannot be undone
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

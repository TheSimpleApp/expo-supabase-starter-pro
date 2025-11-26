import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

interface AvatarProps {
  url: string | null;
  size?: number;
  onUpload: (filePath: string) => void;
  editable?: boolean;
}

export function Avatar({ url, size = 120, onUpload, editable = true }: AvatarProps) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) throw error;

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please allow access to your photos to upload an avatar'
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 0.8,
        aspect: [1, 1],
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const image = result.assets[0];

      // Convert image to blob
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      // Generate unique filename
      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Call parent callback with file path
      onUpload(filePath);

      // Update local state
      setAvatarUrl(image.uri);

      Alert.alert('Success', 'Avatar uploaded successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to upload avatar');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <View className="items-center">
      <View
        style={{ width: size, height: size }}
        className="rounded-full bg-secondary border-2 border-border overflow-hidden items-center justify-center"
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: size, height: size }}
            className="rounded-full"
          />
        ) : (
          <View className="items-center justify-center" style={{ width: size, height: size }}>
            <Text className="text-4xl text-muted-foreground">👤</Text>
          </View>
        )}
      </View>

      {editable && (
        <TouchableOpacity
          onPress={uploadAvatar}
          disabled={uploading}
          className="mt-3 px-4 py-2 bg-primary rounded-lg active:opacity-80 disabled:opacity-50"
        >
          {uploading ? (
            <ActivityIndicator size="small" color="hsl(var(--primary-foreground))" />
          ) : (
            <Text className="text-sm font-medium text-primary-foreground">
              {avatarUrl ? 'Change Photo' : 'Upload Photo'}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

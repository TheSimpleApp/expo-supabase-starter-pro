import React from 'react';
import { View, Text } from 'react-native';

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = 'or' }: AuthDividerProps) {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-px bg-border" />
      <Text className="px-4 text-sm text-muted-foreground">{text}</Text>
      <View className="flex-1 h-px bg-border" />
    </View>
  );
}

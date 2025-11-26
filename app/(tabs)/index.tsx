import { View, Text, Pressable } from 'react-native';
import { useAuth } from '@/lib/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-bold text-foreground mb-4">
          Welcome! 👋
        </Text>
        <Text className="text-muted-foreground text-center text-lg mb-2">
          You're signed in as
        </Text>
        <Text className="text-primary font-semibold text-lg mb-8">
          {user?.email}
        </Text>
        <Text className="text-muted-foreground text-center max-w-sm">
          This is your home screen. Start building your app by editing this file at{' '}
          <Text className="text-foreground font-mono">app/(tabs)/index.tsx</Text>
        </Text>
      </View>
    </View>
  );
}

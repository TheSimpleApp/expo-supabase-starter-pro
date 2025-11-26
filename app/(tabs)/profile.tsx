import { View, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib/useAuth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  return (
    <View className="flex-1 bg-background px-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-foreground mb-8">
          Profile
        </Text>

        <View className="bg-secondary rounded-lg p-6 mb-6">
          <Text className="text-sm text-muted-foreground mb-2">Email</Text>
          <Text className="text-foreground text-lg font-medium">
            {user?.email}
          </Text>
        </View>

        <View className="bg-secondary rounded-lg p-6 mb-6">
          <Text className="text-sm text-muted-foreground mb-2">User ID</Text>
          <Text className="text-foreground font-mono text-sm">
            {user?.id}
          </Text>
        </View>

        <Pressable
          className="bg-destructive rounded-lg py-4 items-center"
          onPress={handleSignOut}
        >
          <Text className="text-destructive-foreground font-semibold">
            Sign out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

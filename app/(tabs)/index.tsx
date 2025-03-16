import { router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/Button';

import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from '~/store/authStore';

export default function Home() {
  const {logout} = useAuthStore();

  const handleLogout = () =>{
    logout();
    
    router.dismissTo('/landing')
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      
       <View className='flex-1 justify-center  '>
       <Button className="bg-black rounded-md" onPress={handleLogout} title={'logout'} />
       </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

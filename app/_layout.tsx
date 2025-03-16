import { useAuthStore } from '~/store/authStore';
import '../global.css';

import { Redirect, router, Stack, useFocusEffect } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {

  const {token, init, cleanupAuthListener } = useAuthStore();

  useEffect(()=>{
    init();
    return ()=>{
      cleanupAuthListener();
    }
  }, []);


 
  // useFocusEffect(() => {
  // if(token){

  //   router.replace('/(tabs)');
  // }
  // });

  return (

    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}



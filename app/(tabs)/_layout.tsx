import { Link, Redirect, router, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuthStore } from '~/store/authStore';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

    const{token} = useAuthStore()
  
  if(!token) {
    return <Redirect href="/landing" />;
  }
  const CustomTabButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity style={{
      backgroundColor: "#007AFF",
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    }} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={40} color="white" />
    </TouchableOpacity>
  );
  
  return (
    <Tabs
  
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/addModal');
          },
        })}
      />

     
 
     
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}

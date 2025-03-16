import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/Button';

import { ScreenContent } from '~/components/ScreenContent';

export default function Modal() {

  const handleBack = (onBack :() => void) =>{
    router.back();
    onBack();

  }
  return (
    <>
  <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <TouchableOpacity 
        className="flex-1 bg-transparent" 
        activeOpacity={1} 
        onPress={() => router.back()}
      >
        <BlurView 
          intensity={10} 
          tint="regular" 
          className="flex-1 items-center justify-end"
        >
          <TouchableOpacity 
            className="mb-24" 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
          >
            <SafeAreaView>
              <View className="bg-white rounded-xl p-4 shadow-lg">
                <View className='p-6'>
                  <TouchableOpacity onPress={()=>handleBack(()=>router.push('/pothole/report'))}>
    
                  <View className='rounded w-48 h-16 bg-yellow-400 items-center justify-center flex-row'>
                    <Ionicons name='document-attach-outline' color="white" size={20}/>
                    <Text className='text-white font-extrabold pl-4' >
                      New Report
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
                <View className='p-6'>
                  <TouchableOpacity
                  onPress={()=>handleBack(()=>router.push('/drive/new'))}
                  >

                  <View className='rounded w-48 h-16 bg-yellow-400 items-center justify-center flex-row'>
                    <Ionicons name='car-sport-outline' color="white" size={20}/>
                    <Text className='text-white font-extrabold pl-4' >
                      New Drive
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
              
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>
    </>
  );
}

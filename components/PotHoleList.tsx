import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native'
import React from 'react'
import images from '~/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router';

interface PotholeListProps {
    image:ImageSourcePropType;
    text: string;
    id:string;
}

export default function PotHoleList({image, text, id}: PotholeListProps) {
  return (
    <Link asChild href={`/pothole/${id}`}>

    <Pressable>

      <View className="m-6">
                 <View className="w-full flex justify-between items-center flex-row p-6 rounded bg-gray-200">
                   <Image source={image} className="w-28 h-28 rounded-lg" />
                   <Text className='text-2xl w-48 text-center'>{text}</Text>
                   <Ionicons name="chevron-forward" size={32} />
                 </View>
               </View>
    </Pressable>
    </Link>
  )
}
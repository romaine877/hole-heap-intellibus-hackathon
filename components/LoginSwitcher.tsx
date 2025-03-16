import { View, Text, Pressable } from 'react-native'
import React from 'react'



interface LoginSwitcherProps {
    isSelect: boolean
    onPress: () => void
    title: string
}

export default function LoginSwitcher({ title, onPress, isSelect }: LoginSwitcherProps) {
  return (
       <Pressable className={`${isSelect ? 'border-black pb-2 border-b-4 ' : ''} w-40 items-center`} onPress={ onPress}>

       <Text className='text-2xl font-bold'>{title }</Text>
       </Pressable>
  )
}
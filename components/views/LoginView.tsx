import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextField from '../TextField'
import { Button } from '../Button'
import { useAuthStore } from '~/store/authStore'
import { Redirect, useRouter } from 'expo-router'

interface LoginViewProps {
    loading: boolean
}

export default function LoginView({ loading }: LoginViewProps) {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const {login, token, loading: storeLoading, error} = useAuthStore();
    const [currentLoading, setCurrentLoading] = useState(loading);

    const router = useRouter()

    const handleSignIn = async() => {
        if(email.length === 0 ){
            setEmailError('Email field cant be empty')
            return;
        }
        if(password.length === 0) {
            setEmailError('Password field cant be empty')
            return;
        }
        try{

           const response = await login(email, password);
           if (response === true) {
               router.replace('/(tabs)');
           }
        }catch(e){

            setEmailError('Error logging in: ' + e as string);
        }
    
        if(token){
            return  <Redirect href={'/(tabs)'}/>
        }
    }




  return (
  <View className='flex-1'>
  <TextField title='Email' value={email} onChangeText={setEmail} />
  <TextField title='Password' value={password} onChangeText={setPassword} />
   <Button
              className="bg-black rounded-md"
              title='Login'
              onPress={handleSignIn}
              disabled={storeLoading}
            />
  </View>
  )
}
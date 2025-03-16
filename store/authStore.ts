import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { auth } from '~/utils/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

type AuthStore = {
    token: string
    init: ()=>void
    setToken: (token: string) => void
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    signUp: (email: string, password: string) => void
    cleanupAuthListener: () => void;
    error?: string
    loading: boolean;
 
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
     
        cleanupAuthListener:()=>{},
      token: '',
      loading: false,
      init:()=>{
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const token = await user.getIdToken()
             
                set({ token });
            }

        })
      },
      setToken: (token: string) => set({ token }),
      login: async (email: string, password: string) => {
        set({error: undefined})
        try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const token = await cred.user.getIdToken(); // store the token
        
        set({ token }); // save token in store
        
return true;
        } catch (error) {
            console.log(error)
         
            Toast.show({
              type: 'error',
              text1: 'Login Failed',
              text2: 'Please check your credentials and try again.'
            });
              
          set({ error: error as string });
          return false
        }
      },
      logout: () => {
        set({ token: '', error: undefined });
        console.log('logged out', get().token)
      },
      signUp: (email: string, password: string) => {

        console.log('signing up with email:', email);
      },
     
    }),
    {
      name: 'auth-storage-id', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
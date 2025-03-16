import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { auth } from "~/utils/firebase";

type AuthStore = {
  token: string;
  init: () => void;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUp: (email: string, password: string) => Promise<boolean>;

  error?: string;
  loading: boolean;
  subScription: any;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: "",
      subScription: null,
      loading: false,
      init: () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await user.getIdToken();

            set({ token });
          }
        });
      },
      setToken: (token: string) => set({ token }),
      login: async (email: string, password: string) => {
        set({ error: undefined });
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          const token = await cred.user.getIdToken(); // store the token


          set({ token }); // save token in store

          return true;
        } catch (error) {
          console.log("here", error);

          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Please check your credentials and try again.",
          });

          set({ error: error as string });
          return false;
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
          set({ token: "", error: undefined });
        } catch (error) {
          console.error("Error signing out:", error);
          Toast.show({
            type: "error",
            text1: "Logout Failed",
            text2: "Please try again.",
          });
        }
      },
      signUp: async (email: string, password: string) => {
        try {
          const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const token = await cred.user.getIdToken(); // store the token
        
          set({ token }); // save token in store

          return true;
        } catch (error) {
          console.log("here", error);

          return false;
        }
      },
    }),
    {
      name: "auth-storage-id",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

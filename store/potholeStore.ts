import { QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import {
  confirmPotholeExists,
  confirmPotholeFixed,
  getPotholes,
  registerNewPothole,
  sendLocation,
} from "~/repositories/mainRepository";

type Pothole = {
  id: string;
  image: string;
  details: string;
};

type LatLong = {
  lat: number;
  long: number;
};

const queryClient = new QueryClient();

export interface PotHoleState {
  streetName: (coordinates: LatLong) => void;
  report: () => void;
  rate: () => void;
  getPotholes: () => void;
  confirmExist: () => void;
  confirmFixed: () => void;
  sendLocation: (request: any) => void;
}

export const usePotHoleStore = create<PotHoleState>((set) => ({
  streetName: (latLong) => {
    try {
      sendLocation(latLong);
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Error sending location",
        text2: "Please try again",
      });
    }
  },

  report: () => {
    registerNewPothole({});
  },
  rate: () => {},
  getPotholes: async () => {
    const response = await queryClient.fetchQuery({
      queryKey: ["potholes"],
      queryFn: () => getPotholes(),
      staleTime: 1000 * 60,
    });
    console.log(response);
  },
  confirmExist: () => {
    confirmPotholeExists({});
  },
  confirmFixed: () => {
    confirmPotholeFixed({});
  },
  sendLocation: (request: any) => {
    console.log(request);
    sendLocation(request);
  },
}));

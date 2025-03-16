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

export interface PotHoleState {
  streetName: (coordinates: LatLong) => void;
  report: () => void;
  rate: () => void;
  getPotholes: () => void;
  confirmExist: () => void;
  confirmFixed: () => void;
  sendLocation: () => void;
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
    const response = await getPotholes();

  },
  confirmExist: () => {
    confirmPotholeExists({});
  },
  confirmFixed: () => {
    confirmPotholeFixed({});
  },
  sendLocation: () => {
    getPotholes();
  },
}));

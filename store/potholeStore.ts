import { create } from 'zustand';
import { confirmPotholeExists, confirmPotholeFixed, getPotholes, registerNewPothole, sendLocation } from '~/repositories/mainRepository';


type Pothole={
id: string
image: string
details: string
}

type LatLong={
  lat:number
  long:number
}

export interface PotHoleState {
  streetName: (coordinates: LatLong,) => void;
  report: () => void;
  rate: () => void;
  getPotholes: () => void;
  confirmExist:()=> void;
  confirmFixed:()=>void;
  sendLocation:()=>void;

}

export const useStore = create<PotHoleState>((set) => ({

  streetName:(latLong)=>{
    try{

      sendLocation(latLong)
    }catch(e){

    }
  },
  
    report: () => {

registerNewPothole({})

    },
    rate: () => {
      
    },
    getPotholes: () => {
      
    },
    confirmExist: () => {
      confirmPotholeExists({})
    },
    confirmFixed: () => {
      confirmPotholeFixed({})
    },
    sendLocation: () => {
      getPotholes()
    },
}));

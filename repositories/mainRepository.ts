import { useAuthStore } from "~/store/authStore";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  data?: any,
) => {
  try {
    const accessToken = useAuthStore.getState().token;
    if (!accessToken) return { error: "No access token" };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    const jsonResponse = await response.json();

    
    if (!response.ok) {
      throw new Error(jsonResponse.message || "Something went wrong");
    }

    return jsonResponse;
  } catch (error: any) {
    return { error: error.message || "Network error" };
  }
};

export const sendLocation = async (locationData: object) => {
  return apiRequest("/location", "POST", locationData);
};

export const registerNewPothole = async (potholeData: object) => {
  return apiRequest("/pothole", "POST", potholeData);
};

export const confirmPotholeExists = async (potholeData: object) => {
  return apiRequest("/pothole/exists", "POST", potholeData);
};

export const confirmPotholeFixed = async (potholeData: object) => {
  return apiRequest("/pothole/fixed", "POST", potholeData);
};

export const getPotholes = async () => {
  return apiRequest("/pothole", "GET", undefined);
};

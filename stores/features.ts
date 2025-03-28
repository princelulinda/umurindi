import { Nationality, NationalityResponse } from './../types/auth';
import { create } from 'zustand'
import apiClient from '@/api/apiClient'

interface featuresState {
    loadNationality: () => Promise<void>;
    isLoading: boolean;
    nationalities: Nationality[] | null
}

const useFeaturesStore = create<featuresState>((set) => ({
    isLoading: true,
    nationalities: null,

    loadNationality: async () => {
        try{
            const response = await apiClient.get<NationalityResponse>("/nationalites/")
            set({ nationalities: response.data?.data })
        }catch(error: any){
            set({ nationalities: null })
            console.log("ERROR LOAD NATIONALITIES", error)
        }finally {
            set({ isLoading: false });
        }
    }
}))

export default useFeaturesStore
import { Nationality, NationalityResponse } from './../types/auth';
import { create } from 'zustand'
import apiClient from '@/api/apiClient'
import { Investissement, InvestissementResponse, Project, ProjectResponse } from '@/types/projet';

interface featuresState {
    loadNationality: () => Promise<void>;
    isLoading: boolean;
    nationalities: Nationality[] | null,
    investissements: Investissement[] | null;
    loadInvestissements: () => Promise<void>;
    projects: Project[] | null;
    loadProjects: () => Promise<void>;
    project: Project | null;
    loadProjectBySlug: (slug: string) => Promise<void>;
}

const useFeaturesStore = create<featuresState>((set) => ({
    isLoading: true,
    nationalities: null,
    investissements: null,
    projects: null,
    project: null,
    investiNow: async (data) => {

            const response = await apiClient.post<InvestissementResponse>('/investissements/',data);
            console.log(response.data, "response");
            return response
        
      },
    loadNationality: async () => {
        try {
            const response = await apiClient.get<NationalityResponse>("/nationalites/")
            set({ nationalities: response.data?.data })
        } catch (error: any) {
            set({ nationalities: null })
            console.log("ERROR LOAD NATIONALITIES", error)
        } finally {
            set({ isLoading: false });
        }
    },

    loadInvestissements: async () => {
        try {
            const response = await apiClient.get<InvestissementResponse>('/investissements/');
            set({ investissements: response.data.data });
        } catch (error: any) {
            set({ investissements: null });
            console.error('Erreur lors du chargement des investissements', error);
        } finally {
            set({ isLoading: false });
        }
    },
 
    loadProjects: async () => {
        try {
            const response = await apiClient.get<ProjectResponse>('/projets/');
            // console.log(response.data, "response");
            
            set({ projects: response.data.data });
        } catch (error: any) {
            set({ projects: null });
            console.error('Erreur lors du chargement des projets', error);
        } finally {
            set({ isLoading: false });
        }
    },

    loadProjectBySlug: async (slug) => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get<Project>(`/projets/${slug}/`);
            console.log(response.data, "response");
            
            set({ project: response.data?.data });
        } catch (error) {
            console.error("Error fetching project details:", error);
            set({ project: null });
        } finally {
            set({ isLoading: false });
        }
    },

}))

export default useFeaturesStore
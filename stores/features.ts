import { Nationality, NationalityResponse } from './../types/auth';
import { create } from 'zustand';
import apiClient from '@/api/apiClient';
import { Investissement, InvestissementResponse, Project, ProjectResponse } from '@/types/projet';

interface FeaturesState {
    isLoading: boolean;
    nationalities: Nationality[] | null;
    investissements: Investissement[] | null;
    projects: Project[] | null;
    project: Project | null;
    credit: Investissement[] | null;


    loadNationality: () => Promise<void>;
    loadInvestissements: () => Promise<void>;
    loadProjects: () => Promise<void>;
    loadProjectBySlug: (slug: string) => Promise<void>;
    loadCredit: () => Promise<void>;
    investiNow: (data: Partial<Investissement>) => Promise<InvestissementResponse>;
    InvestissementsCredit: (data: Partial<Investissement>) => Promise<any>;
    
}

const useFeaturesStore = create<FeaturesState>((set) => ({
    isLoading: true,
    nationalities: null,
    investissements: null,
    projects: null,
    project: null,
    credit: null,

    investiNow: async (data) => {
        try {
            const response = await apiClient.post<InvestissementResponse>('/investissements/', data);
            // console.log(response.data, "Investissement réussi");
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'investissement :", error);
            throw error;
        }
    },

    loadNationality: async () => {
        try {
            const response = await apiClient.get<NationalityResponse>("/nationalites/");
            set({ nationalities: response.data?.data });
        } catch (error) {
            console.error("Erreur lors du chargement des nationalités :", error);
            set({ nationalities: null });
        } finally {
            set({ isLoading: false });
        }
    },

    loadInvestissements: async () => {
        try {
            const response = await apiClient.get<InvestissementResponse>('/investissements/');
            set({ investissements: response.data.data });
        } catch (error) {
            console.error("Erreur lors du chargement des investissements :", error);
            set({ investissements: null });
        } finally {
            set({ isLoading: false });
        }
    },

    loadProjects: async () => {
        try {
            const response = await apiClient.get<ProjectResponse>('/projets/');
            set({ projects: response.data.data });
        } catch (error) {
            console.error("Erreur lors du chargement des projets :", error);
            set({ projects: null });
        } finally {
            set({ isLoading: false });
        }
    },

    loadProjectBySlug: async (slug: string) => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get<{ data: Project }>(`/projets/${slug}/`);
            set({ project: response.data.data });
        } catch (error) {
            console.error("Erreur lors du chargement du projet :", error);
            set({ project: null });
        } finally {
            set({ isLoading: false });
        }
    },

    loadCredit: async () => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get<{ credits: Investissement[] }>("/credit/valides-all/");
            console.log(response.data, "CHARGEMENT CREDIT OKAY");
            
            set({ credit: response.data?.credits});
        } catch (error) {
            console.error("Erreur lors du chargement des crédits :", error);
            set({ credit: null });
        } finally {
            set({ isLoading: false });
        }
    },
    loadCreditList: async () => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get<{ credits: Investissement[] }>("/credit/");
            console.log(response.data, "CHARGEMENT CREDIT OKAY");
            
            set({ credit: response.data});
        } catch (error) {
            console.error("Erreur lors du chargement des crédits :", error);
            set({ credit: null });
        } finally {
            set({ isLoading: false });
        }
    },
    creditRequest: async (data:any) => {
        set({ isLoading: true });
        try {
            const response = await apiClient.post<{ response: any[] }>("/credit/", data);
            console.log(response.data, "CHARGEMENT CREDIT OKAY");
        } catch (error) {
            console.error("Erreur lors du chargement des crédits :", error);
        } finally {
            set({ isLoading: false });
        }
    },
    async cancelCredit(slug: string): Promise<any> {
        const response = await apiClient.post(`/credits/${slug}/annuler/`);
        return response.data
      },
    InvestissementsCredit: async (data) => {
        // set({ isLoading: true });
        try {
            const response = await apiClient.post<{ credits: Investissement[] }>("/investisements-credit/", data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
        } 
    },
}));

export default useFeaturesStore;
// /investisements-credit/

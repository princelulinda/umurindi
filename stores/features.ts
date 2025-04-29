import { Nationality, NationalityResponse } from './../types/auth';
import { create } from 'zustand';
import apiClient from '@/api/apiClient';
import { Investissement, InvestissementResponse, Project, ProjectResponse } from '@/types/projet';
import axios, { Axios } from 'axios';

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
    withdrawRequest:(data:any)=>Promise<any>;
    transactions:string[]
    
}

const useFeaturesStore = create<FeaturesState>((set) => ({
    isLoading: true,
    nationalities: null,
    investissements: null,
    projects: null,
    project: null,
    credit: null,
    transactions: [],

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
            console.log(response);
            
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
            
            set({ credit: response.data?.data});
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
            
            set({ credit: response?.data.credits});
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
 withdrawRequest: async (data:{motif: string, montant:string})=>{
    try {
        const response = await apiClient.post<{ credits: Investissement[] }>("/transactions/demande-retrait/", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error
    }
 },

 loadTransactions: async () => {
    set({ loading: true, error: null })
    
    try {
      const response = await apiClient.get<TransactionApiResponse>('/transactions/')

      const formattedTransactions = response.data.data.map(tx => {
        // Détermine le type de transaction
        let transactionType: Transaction['type']
        switch (tx.type_transaction) {
          case 'depot':
            transactionType = 'deposit'
            break
          case 'retrait':
            transactionType = 'withdrawal'
            break
          case 'dividende':
            transactionType = 'dividend'
            break
          case 'transfert':
            transactionType = 'transfer'
            break
          default:
            transactionType = 'investment'
        }

        const amount = tx.entrer !== "0.00" 
          ? parseFloat(tx.entrer) 
          : -parseFloat(tx.sortie)

        return {
          id: tx.id,
          type: transactionType,
          typeDisplay: tx.type_transaction_display,
          amount,
          initialBalance: parseFloat(tx.initial),
          finalBalance: parseFloat(tx.solde),
          status: tx.statut_display,
          statusDisplay: tx.statut_display,
          motif: tx.motif,
          date: tx.create_date,
          reference: `TX-${tx.id.toString().padStart(6, '0')}`,
          justificatif: tx.justificatif
        }
      })

      set({ 
        transactions: formattedTransactions,
        loading: false 
      })

    } catch (error) {
      console.error('Error loading transactions:', error)
      
      let errorMessage = 'Erreur lors du chargement des transactions'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      

      set({ 
        error: errorMessage,
        loading: false 
      })
    }
  }

}));

export default useFeaturesStore;
// /investisements-credit/

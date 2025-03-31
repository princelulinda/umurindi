export interface CategoryProject {
    id: number;
    title: string;
    slug: string;
}

export interface Project {
    id: number;
    category: CategoryProject;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    budget: number;
    interet_estimer: number;
    budget_part: number;
    delai_realisation: number;
    statut: number;
    statut_label: string;
    create_date: string;
    updated_date: string;
    total_investment: number;
    remaining_budget: number;
    location: string,
    end_date: string,
    start_date: string,
    investissements: Investissement[]
}

export interface ProjectResponse {
    message: string;
    data: Project[]; 
  }


  export interface Investissement {
    id: number;
    user: number; 
    projet: Project;
    projet_title: string;
    montant: number;
    motif: string;
    date: string;
    create_date: string;
    update_date: string;
    slug: string;
    interet_estime: number;
    part: number;
  }

  export interface InvestissementResponse {
    message: string;
    data: Investissement[];
  }
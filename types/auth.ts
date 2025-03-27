export interface User {
	first_name: string;
	last_name: string;
	numero: string;
	email: string;
	avatar: string;
	balance:string,
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
}

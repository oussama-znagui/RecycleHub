export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'particulier' | 'collecteur';
    points: number
}

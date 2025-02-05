export interface User {
    uuid: string;
    username: string;
    email: string;
    password: string;
    role: 'particulier' | 'collecteur';
}

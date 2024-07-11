export interface Program {
    id: number;
    name: string;
    description: string;
    longDescription?: string; 
    date: string;
    price: string;
    photoUri: string;
    category: string;
    age?: string;             
    location: string;        
    capacity?: number;        
}
  
export interface ProgramHoster {
    name: string;
    email: string;
    number: string;
}
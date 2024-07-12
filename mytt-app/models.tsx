export interface Program {
    id: number;
    name: string;
    description: string;
    longDescription?: string; 
    date: string;
    price: string;
    photoUri: string;
    category: string;
    age: string; 
	mode: string;             
    location: string;        
    capacity?: string;
	bookmark?: boolean;        
}
  
export interface ProgramHoster {
    name: string;
    email: string;
    number: string;
}
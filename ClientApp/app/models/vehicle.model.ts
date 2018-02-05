export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    contact: Contact;
    features: number[];
}

export interface Vehicle {
    id: number, 
    model: { id: number, name: string },
    make: { id: number, name: string }, 
    isRegistered: boolean, 
    contact: Contact, 
    lastUpdate: Date, 
    vehicleFeatures: number[] 
}


export interface Contact {
    name: string;
    phone: string;
    email: string;
}
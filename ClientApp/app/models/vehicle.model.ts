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
    model: KeyValuePair,
    make: KeyValuePair, 
    isRegistered: boolean,
    contact: Contact, 
    lastUpdate: Date, 
    vehicleFeatures: KeyValuePair[] 
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface KeyValuePair {
    id: number;
    name: string;
}
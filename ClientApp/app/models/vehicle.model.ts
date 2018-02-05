export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    contact: Contact;
    features: number[];
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}
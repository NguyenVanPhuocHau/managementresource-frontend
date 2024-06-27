interface Role {
    id: number;
    name: string;
    permissions: string[];
}

interface Unit {
    id: number | null;
    name: string;
    description: string;
}

export class Employee {
    id: number;
    fullName: string;
    email: string;
    role: Role;
    unit: Unit;
}

interface Role {
    id: number;
    name: string;
    permissions: string[];
}
interface user {
    id: number;
    fullName: string;
    email: string;
    role: Role;
}

export class customer {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    problem: string;
    userId: number | null | undefined = null;
}

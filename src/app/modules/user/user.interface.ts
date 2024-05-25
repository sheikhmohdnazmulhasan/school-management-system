
export interface TUser {
    id: string;
    password: string;
    needsPasswordChanges: boolean;
    role: 'admin' | 'faculty' | 'student';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};

export interface NewUser {
    password: string | null;
    role: string | null;
    id: string | null;
};




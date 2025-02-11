// src/models/DataUserModel.ts
import conexion from '../config/db';

export interface DataUser {
    id?: number;
    user_id: number;
    u_name: string;
    lastName: string;
    email: string;
    phone: string;
    u_address: string;
    age: number;
    u_role: string;
}

export const DataUserModel = {
    getAllDataUsers: async (): Promise<DataUser[]> => {
        const [rows] = await conexion.query('SELECT * FROM data_users');
        return rows as DataUser[];
    },

    // getDataUserById: async (id: number): Promise<DataUser | null> => {
    //     const [rows]: any = await conexion.query('SELECT * FROM data_users WHERE id = ?', [id]);
    //     return rows.length > 0 ? rows[0] : null;
    // },

    getDataByUserId: async (user_id: number): Promise<DataUser | null> => {
        const [rows]: any = await conexion.query('SELECT * FROM data_users WHERE user_id = ?', [user_id]);
        return rows.length > 0 ? rows[0] : null;
    }
};

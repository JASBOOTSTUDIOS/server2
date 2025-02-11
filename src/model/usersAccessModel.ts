import  conexion  from '../config/db';

export interface User {
    id?: number;
    username: string;
    email: string;
    u_password: string;
}

export const UserModel = {
    getAllUsers: async (): Promise<User[]> => {
        const [rows] = await conexion.query('SELECT * FROM usersaccess');
        return rows as User[];
    },
    findUserByEmail: async (email: string) => {
        const [rows] = await conexion.query("SELECT * FROM users WHERE email = ?", [email]);
        return (rows as any)[0];
      },

    getUserById: async (id: number): Promise<User | null> => {
        const [rows]: any = await conexion.query('SELECT * FROM usersaccess WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    createUser: async (user: User): Promise<void> => {
        await conexion.query('INSERT INTO usersaccess (username, email, u_password) VALUES (?, ?, ?)', 
            [user.username, user.email, user.u_password]);
    }
};

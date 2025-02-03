import { Request, Response } from "express";
import conexion from "../config/db";

class Users{
static getUsers = async (req: Request, res: Response)=>{
    try {
        const [rows]:any = await conexion.query(`
      SELECT * FROM usersaccess u
      LEFT JOIN data_users d ON u.id = d.user_id
    `);
        res.json(rows);
    }catch (error){
        console.log("El codigo dio error" + error);
        res.status(500).json({error:"Error al obtener los Usuarios"});
    };
};

static  getUserById = async (req: Request, res:Response)=>{
    try{
        const id = req.params.id;
        const [rows]:any = await conexion.query('SELECT * FROM usersaccess WHERE id = ?', [id]);
        if((rows as any[]).length ===0){
            res.status(404).json({error:"Usuario no encontrado."});
        };

        res.json(rows[0]);
    }catch(error){
        res.status(500).json({error:"Error al obtener el Usuario."})
    }
}
}

export default Users;
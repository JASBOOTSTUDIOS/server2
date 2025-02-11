import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Request, Response } from "express";

const router = Router()

router.use(authMiddleware);

router.get('/dashboard', (req:Request,res:Response)=>{
    res.send(`<center><h1>Estes es el Dashboard</h1></center>`)
});

export default router;
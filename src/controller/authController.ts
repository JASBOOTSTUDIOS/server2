import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/usersAccessModel";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("llego el request");
    const { username, email, u_password } = req.body;
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(u_password, 10);
    await UserModel.createUser({ username, email, u_password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(`El error del catch: ${error}`);
    res.status(500).json({message: "Error al conectar al server."})
    next(error); // ✅ Pasamos el error a Express
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, u_password } = req.body;

    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      console.log("Error 1");
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    
    const isMatch = await bcrypt.compare(u_password, user.u_password);
    if (!isMatch) {
      console.log("Error 2");
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Error 3");
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log("catch Error find");
    next(error); // error inexpress.
  }
};

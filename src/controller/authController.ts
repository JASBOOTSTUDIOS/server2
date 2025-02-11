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
    next(error); // ✅ Pasamos el error a Express
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.u_password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error); // ✅ Pasamos el error a Express
  }
};

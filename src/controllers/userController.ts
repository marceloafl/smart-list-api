import { Request, Response } from "express";
import { validationResult, body } from "express-validator";
import { UserService } from "../services/userService";

export const register = async (req: Request, res: Response): Promise<void> => {
  await body("email").isEmail().notEmpty().run(req);
  await body("password").isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const result = await UserService.registerUser(email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  await body("email").isEmail().notEmpty().run(req);
  await body("password").notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const { token, user } = await UserService.loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error });
  }
};

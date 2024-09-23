import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  static async registerUser(email: string, password: string) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      passwordHash,
    };

    await UserRepository.createUser(newUser);
    return { message: "User registered successfully!" };
  }

  static async loginUser(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    return { token, user: { email: user.email } };
  }
}

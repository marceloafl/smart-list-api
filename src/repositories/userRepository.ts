import UserModel from "../models/userModel";

export class UserRepository {
  static async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  static async createUser(userData: any) {
    const newUser = new UserModel(userData);
    return newUser.save();
  }
}

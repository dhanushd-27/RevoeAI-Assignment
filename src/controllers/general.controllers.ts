import { Request, Response } from "express"
import { UserTypeSchema } from "../types/index"
import { UserModel } from "../models/users.model";

export const signUpController = async (req: Request, res: Response ) => {
  // Parse Data
  // Check user exists or not
  // Hash Password
  // Store information
  const parsedData = UserTypeSchema.safeParse(req.body);

  if(!parsedData.success){
    res.status(403).json({
      message: "Invalid Input Data",
      error: parsedData.error
    })
    return;
  }

  try {
    await UserModel.create({
      name: parsedData.data?.name,
      email: parsedData.data?.email,
      password: parsedData.data?.password
    });

    res.status(200).json({
      message: "User Created Successfully"
    })
  } catch (error) {
    res.status(400).json({
      message: "User Creation Failed"
    })
  }
}

export const signInController = async () => {
  // Check user exists or not
  // compare hashed password and input password
  // if true generate token and pass it
}
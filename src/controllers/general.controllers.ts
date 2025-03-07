import { Request, Response } from "express"
import { UserSignInSchema, UserSignUpSchema } from "../types/index"
import { UserModel } from "../models/users.model";
import jwt from "jsonwebtoken"
import argon2 from "argon2";

export const signUpController = async (req: Request, res: Response ) => {
  // Parse Data with Zod
  const parsedData = UserSignUpSchema.safeParse(req.body);

  // Make Sure Parsing is successfull
  if(!parsedData.success){
    res.status(403).json({
      message: "Invalid Input Data",
      error: parsedData.error
    })
    return;
  }

  try {
    // Check user exists or not
    const isFound = await UserModel.findOne({
      email: parsedData.data.email
    });

    if(isFound) {
      res.status(409).json({
        message: "User already exists"
      });
      return;
    }

    // Hash Password
    const hashedPassword = await argon2.hash(parsedData.data.password);

    // Store information in DB
    await UserModel.create({
      name: parsedData.data.name,
      email: parsedData.data.email,
      password: hashedPassword
    });

    res.status(200).json({
      message: "User Created Successfully"
    })
  } catch (error) {
    // If any error occurs while storing data
    res.status(400).json({
      message: "User Creation Failed"
    })
  }
}

export const signInController = async (req: Request, res: Response) => {
  //Parse Data with Zod
  const parsedData = UserSignInSchema.safeParse(req.body);

  // Make sure parsing is successfull
  if(!parsedData.success){
    res.status(403).json({
      message: "Invalid Input Data",
      error: parsedData.error
    })
    return;
  }

  try {
    // Check user exists or not
    const isFound = await UserModel.findOne({
      email: parsedData.data.email
    });

    if(!isFound) {
      res.status(404).json({
        message: "User not found"
      });
      return;
    }

    // compare hashed password in Database and input password by user
    const isPasswordMatched = await argon2.verify(isFound.password, parsedData.data.password);

    if(!isPasswordMatched) {
      res.status(403).json({
        message: "Invalid Password"
      });
      return;
    }

    // if true generate token and pass it in response
    // Update Expiry here
    const token = jwt.sign({
      email: isFound.email,
      id: isFound._id.toString()
    }, process.env.JWT_SECRET as string, { expiresIn: "15s"});

    res.status(200).json({
      message: "User Logged In Successfully",
      token
    })
    return;
  } catch (error) {
    res.status(400).json({
      message: "User Login Failed"
    })
    return;
  }
}

export const verifyController = (req: Request, res: Response) => {
  res.status(200).json({
    message: "User Verified",
    email: req.user.email
  })
}
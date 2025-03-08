import { Request, Response } from "express"
import { UserSignInSchema, UserSignUpSchema } from "../types/index"
import { UserModel } from "../models/users.model";
import jwt from "jsonwebtoken"
import argon2 from "argon2";
import { extractSpreadsheetId } from "../utils";
import axios from "axios";
import { SheetSchema } from "../types";

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
    }, process.env.JWT_SECRET as string, { expiresIn: "1m"});

    res.cookie("token", token, {
      httpOnly: true, 
      secure: false,  
      maxAge: 3600000,
      path: "/",
    });

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

export const fetchData = async (req: Request, res: Response) => {
  const parsedData = SheetSchema.safeParse(req.body);

  if(!parsedData.success) {
    res.status(403).json({
      message: "Invalid Input Data"
    })
    return;
  }

  const spreadsheetId = extractSpreadsheetId(parsedData.data.link);

  if(!spreadsheetId) {
    res.status(403).json({
      message: "Invalid Spreadsheet Link"
    })
    return;
  }

  try {
    const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${parsedData.data.sheetName}?key=${process.env.GOOGLE_API_KEY}`);

    res.status(200).json({
      message: "Data Fetched Successfully",
      data: response.data.values
    })
  } catch (error: any) {
    res.status(400).json({
      message: "Data Fetching Failed",
      error: error,
    });
  }
}

export const verifyUser = (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if(!token) {
    res.status(401).json({
      success: false
    });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(401).json({
      success: false
    });
  }
}

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    path: "/", // Ensure path matches the one used when setting the cookie
  });

  res.status(200).json({
    message: "User Logged Out Successfully",
  });
};

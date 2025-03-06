import { Router } from "express";
import { signInController, signUpController } from "../controllers/general.controllers";

export const generalRouter = Router();

generalRouter.post('/signup', signUpController);
generalRouter.post('/signin', signInController);
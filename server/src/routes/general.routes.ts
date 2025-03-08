import { Router } from "express";
import { signInController, signUpController, fetchData, verifyUser } from "../controllers/general.controllers";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware";

export const generalRouter = Router();

generalRouter.post('/signup', signUpController);
generalRouter.post('/signin', signInController);
generalRouter.get('/sheet', userAuthMiddleware,fetchData);
generalRouter.post('/verify', verifyUser);
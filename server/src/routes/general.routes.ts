import { Router } from "express";
import { signInController, signUpController, fetchData, verifyUser, logoutUser } from "../controllers/general.controllers";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware";

export const generalRouter = Router();

generalRouter.get('/sheet', userAuthMiddleware,fetchData);
generalRouter.post('/signup', signUpController);
generalRouter.post('/signin', signInController);
generalRouter.post('/verify', verifyUser);
generalRouter.post('/logout', logoutUser);
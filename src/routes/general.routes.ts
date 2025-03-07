import { Router } from "express";
import { fetchData, signInController, signUpController } from "../controllers/general.controllers";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware";

export const generalRouter = Router();

generalRouter.post('/signup', signUpController);
generalRouter.post('/signin', signInController);
generalRouter.get('/sheet', userAuthMiddleware,fetchData);
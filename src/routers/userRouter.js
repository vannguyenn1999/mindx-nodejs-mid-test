import express from "express";

import { registerUser, loginUser } from "../controllerrs/userController.js";

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);

export default UserRouter;

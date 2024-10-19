import express from "express";
import { loginSuperAdmin, registerSuperAdmin } from "../controller/superAdmin.auth.js";
import { loginAdmin, registerAdmin } from "../controller/admin.auth.js";
import { loginUser, registerUser } from "../controller/user.auth.js";

const authRoute = express.Router()

//SuperAdmin ==>

//Register
authRoute.post("/register/superAdmin", registerSuperAdmin)

//login
authRoute.post("/login/superAdmin", loginSuperAdmin)

//Admin

//Register
authRoute.post("/register/admin", registerAdmin)

//login
authRoute.post("/login/admin", loginAdmin)

//user

//Register
authRoute.post("/register/user", registerUser)

//Login
authRoute.post("/login/user", loginUser)
export default authRoute;
import express from "express";
import { loginSuperAdmin, registerSuperAdmin } from "../controller/superAdmin.auth.js";
import { loginAdmin, registerAdmin } from "../controller/admin.auth.js";

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
export default authRoute;
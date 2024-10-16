import express from "express";
import { isSuperAdminAuthenticated } from "../middleware/SuperAdmin.Authentication.js";
import { getAllAdmin, superAdminData, updateSuperAdminData } from "../controller/superAdmin.controller.js";

const superAdminRoute = express.Router();

//get all admin list
superAdminRoute.get("/get", isSuperAdminAuthenticated, getAllAdmin)

//get data of superAdmin
superAdminRoute.get("/info", isSuperAdminAuthenticated, superAdminData)

//update SuperAdmin
superAdminRoute.put("/update", isSuperAdminAuthenticated, updateSuperAdminData)

export default superAdminRoute
import express from "express";
import { isAdminAuthenticated } from "../middleware/admin.Authentication.js";
import { getAdminData, updateAdminData } from "../controller/admin.controller.js";

const adminRoute = express.Router();

//get admin data when logged in
adminRoute.get("/", isAdminAuthenticated, getAdminData)

//update admin data when logged in
adminRoute.put("/update", isAdminAuthenticated, updateAdminData)
export default adminRoute
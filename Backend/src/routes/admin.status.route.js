import express from "express";
import { isSuperAdminAuthenticated } from "../middleware/SuperAdmin.Authentication.js";
import { changeAdminStatus } from "../controller/admin.status.js";

const updateStatusAdmin = express.Router();

updateStatusAdmin.put("/update/:id", isSuperAdminAuthenticated, changeAdminStatus)

export default updateStatusAdmin
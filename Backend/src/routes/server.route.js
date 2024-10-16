import express from "express";
import authRoute from "./auth.route.js";
import updateStatusAdmin from "./admin.status.route.js";
import superAdminRoute from "./superAdmin.route.js";

const serverRoute = express.Router()

//auth routes
serverRoute.use("/auth", authRoute)

//update status route
serverRoute.use("/", updateStatusAdmin)

//superAdmin Routes
serverRoute.use("/superAdmin", superAdminRoute)

export default serverRoute;
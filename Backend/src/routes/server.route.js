import express from "express";
import authRoute from "./auth.route.js";
import updateStatusAdmin from "./admin.status.route.js";
import superAdminRoute from "./superAdmin.route.js";
import adminRoute from "./admin.route.js";
import hotelRoute from "./hotel.route.js";
import roomRoute from "./room.route.js";
import ratingRoute from "./rating.route.js";

const serverRoute = express.Router()

//auth routes
serverRoute.use("/auth", authRoute)

//update status route
serverRoute.use("/", updateStatusAdmin)

//superAdmin Routes
serverRoute.use("/superAdmin", superAdminRoute)

//admin Route
serverRoute.use("/admin", adminRoute)

//hotel Route
serverRoute.use("/admin/hotel", hotelRoute)

//room route
serverRoute.use("/hotel/room", roomRoute)

//rating route
serverRoute.use("/hotel/rating", ratingRoute)

export default serverRoute;
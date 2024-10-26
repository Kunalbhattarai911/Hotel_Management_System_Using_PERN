import express from "express";
import { isUserAuthenticated } from "../middleware/user.Authentication.js";
import { bookingHotel, updateBookingStatusByAdmin } from "../controller/Booking.controller.js";
import { isAdminAuthenticated } from "../middleware/admin.Authentication.js";

const bookingRoute = express.Router()

//create booking
bookingRoute.post("/:hotelId/room/:roomId", isUserAuthenticated, bookingHotel)

//update booking status by admin
bookingRoute.put("/:id", isAdminAuthenticated, updateBookingStatusByAdmin)

export default bookingRoute
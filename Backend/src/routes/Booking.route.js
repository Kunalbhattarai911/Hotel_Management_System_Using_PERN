import express from "express";
import { isUserAuthenticated } from "../middleware/user.Authentication.js";
import { bookingHotel } from "../controller/Booking.controller.js";

const bookingRoute = express.Router()

//create booking
bookingRoute.post("/:hotelId/room/:roomId", isUserAuthenticated, bookingHotel)

export default bookingRoute
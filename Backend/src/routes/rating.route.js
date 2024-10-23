import express from "express";
import { isUserAuthenticated } from "../middleware/user.Authentication.js";
import { hotelRating } from "../controller/rating.controller.js";

const ratingRoute = express.Router()

ratingRoute.post("/:id", isUserAuthenticated, hotelRating)

export default ratingRoute;
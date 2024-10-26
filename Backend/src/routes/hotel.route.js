import express from "express";
import { addHotel, deleteHotel, getAllHotel, getHotelByID, updateHotelInfo } from "../controller/hotel.controller.js";
import { isAdminAuthenticated } from "../middleware/admin.Authentication.js";

const hotelRoute = express.Router();

//Add hotel By Admin
hotelRoute.post("/add", isAdminAuthenticated, addHotel);

//Get All Hotel
hotelRoute.get("/", isAdminAuthenticated, getAllHotel)

//Get single Hotel By ID
hotelRoute.get("/:id", isAdminAuthenticated, getHotelByID)

//update hotel by id
hotelRoute.put("/update/:id", isAdminAuthenticated, updateHotelInfo)

//delete hotel
hotelRoute.delete("/delete/:id", isAdminAuthenticated, deleteHotel)

export default hotelRoute;

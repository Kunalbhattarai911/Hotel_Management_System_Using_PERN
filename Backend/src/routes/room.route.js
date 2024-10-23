import express from "express";
import { isAdminAuthenticated } from "../middleware/admin.Authentication.js";
import {
  addRoom,
  deleteRoom,
  getRoom,
  getSingleRoom,
  updateRoom,
} from "../controller/Room.controller.js";

const roomRoute = express.Router();

//Get All Room
roomRoute.get("/:id", isAdminAuthenticated, getRoom);

//Get Room By id
roomRoute.get("/:hotelId/room/:roomId", isAdminAuthenticated, getSingleRoom);

//Add Room
roomRoute.post("/add/:id", isAdminAuthenticated, addRoom);

//update room
roomRoute.put("/update/:hotelId/room/:roomId", isAdminAuthenticated, updateRoom)

//delete room
roomRoute.delete("/delete/:hotelId/room/:roomId", isAdminAuthenticated, deleteRoom)

export default roomRoute;

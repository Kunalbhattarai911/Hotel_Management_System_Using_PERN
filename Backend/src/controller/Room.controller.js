import prisma from "../../src/database/db.config.js";

//add room

export const addRoom = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const hotelId = req.params.id;
    const { roomNumber, bedType, pricePerNight } = req.body;

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
        adminId: String(adminId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message: "Not Found",
        success: false,
      });
    }

    //check the roomNumber is presented or not
    const checkRoomNumber = await prisma.room.findUnique({
      where: {
        roomNumber: roomNumber,
      },
    });

    if (checkRoomNumber) {
      return res.status(401).json({
        message: "This Room Number is already registered.",
        success: false,
      });
    }

    //create room
    const createRoom = await prisma.room.create({
      data: {
        roomNumber: roomNumber,
        bedType,
        pricePerNight,
        hotelId: String(hotelId),
      },
    });

    return res.status(201).json({
      message: "Room Created Success",
      success: true,
      RoomDetail: createRoom,
    });
  } catch (error) {
    console.error("Error Creating Room", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//get all room of that hotel
export const getRoom = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const hotelId = req.params.id;

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
        adminId: String(adminId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message: "Not Found",
        success: false,
      });
    }

    //find room of that hotel
    const getAllRoom = await prisma.room.findMany({
      where: {
        hotelId: String(hotelId),
      },
    });

    //count total room
    const count = await prisma.room.count()

    return res.status(200).json({
      message: "Room Details:",
      success: true,
      Details: getAllRoom,
      TotalRoom : count
    });
  } catch (error) {
    console.error("Error Retriving Room", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//get single room
export const getSingleRoom = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;

    // Check if the hotel belongs to the admin
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
        adminId: String(adminId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message:
          "Hotel not found or you do not have permission to access this hotel.",
        success: false,
      });
    }

    // Find the single room by its id
    const findRoom = await prisma.room.findUnique({
      where: {
        id: String(roomId),
        hotelId: String(hotelId),
      },
    });

    if (!findRoom) {
      return res.status(404).json({
        message: "Room not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Room Detail",
      success: true,
      Room: findRoom,
    });
  } catch (error) {
    console.error("Error Retriving Room", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//update room info
export const updateRoom = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;

    const { roomNumber, bedType, pricePerNight } = req.body;

    //check if the hotel belongs to admin or not
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
        adminId: String(adminId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message:
          "Hotel Not Found Or You Donot have permission to access this hotel",
        success: false,
      });
    }

    //check if the room exist or not
    const findRoom = await prisma.room.findUnique({
      where: {
        id: String(roomId),
        hotelId: String(hotelId),
      },
    });

    if (!findRoom) {
      return res.status(404).json({
        message: "Room Not Found",
        success: false,
      });
    }

    //check if the room number is already used by another room or not
    if (roomNumber && roomNumber !== findRoom.roomNumber) {
      const checkRoomNumber = await prisma.room.findUnique({
        where: {
          roomNumber: roomNumber,
          hotelId: String(hotelId),
        },
      });

      if (checkRoomNumber) {
        return res.status(400).json({
          message: "Room Number already exist in this hotel",
          success: false,
        });
      }
    }

    //update the room details
    const updateRoom = await prisma.room.update({
      where: {
        id: String(roomId),
      },
      data: {
        roomNumber: roomNumber || undefined,
        bedType: bedType || undefined,
        pricePerNight: pricePerNight || undefined,
      },
    });

    return res.status(201).json({
      message: "Room Details Updated",
      success: true,
      data: updateRoom,
    });
  } catch (error) {
    console.error("Error updating Room", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//delete  room
export const deleteRoom = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
        adminId: String(adminId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message: "Hotel Not Found Or You Are Not Authorized",
        success: false,
      });
    }

    //find room
    const findRoom = await prisma.room.findUnique({
      where: {
        id: String(roomId),
        hotelId: String(hotelId),
      },
    });

    if (!findRoom) {
      return res.status(404).json({
        message: "Room Not Found",
        success: false,
      });
    }

    //delete room
    await prisma.room.delete({
      where: {
        id: String(roomId),
        hotelId: String(hotelId),
      },
    });

    return res.status(200).json({
      message: `${findRoom.roomNumber} Room deleted successful`,
      success: true,
    });
  } catch (error) {
    console.error("Error Deleting Room", error);
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
      error: error.message,
    });
  }
};

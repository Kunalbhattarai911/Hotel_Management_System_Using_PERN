import prisma from "../database/db.config.js";

export const bookingHotel = async (req, res) => {
  try {
    const userId = req.user.id;
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;
    const { checkIn, checkOut, totalCost, bookingStatus } = req.body;

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where: {
        id: String(hotelId),
      },
    });

    if (!findHotel) {
      return res.status(404).json({
        message: "Hotel Not Found",
        success: false,
      });
    }

    //find Room
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

    //check if the user has already booked or not
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: String(userId),
        roomId: String(roomId),
        hotelId: String(hotelId),
        OR: [
          {
            checkIn: {
              lte: new Date(checkOut),
            },
          },
          {
            checkOut: {
              gte: new Date(checkIn),
            },
          },
        ],
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this room on the specific date",
        success: false,
      });
    }

    //create booking
    const newBooking = await prisma.booking.create({
      data: {
        userId: String(userId),
        roomId: String(roomId),
        hotelId: String(hotelId),
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalCost : parseFloat(totalCost),
        bookingStatus,
      },
    });
    return res.status(201).json({
        message: "Booking successful.",
        success: true,
        booking: newBooking,
      });
    } catch (error) {
      console.error("Error while booking hotel:", error);
      return res.status(500).json({
        message: "An error occurred during booking",
        success: false,
        error: error.message,
      });
    }
  };

  //update booking status
  export const updateBookingStatusByAdmin = async(req,res) => {
    try {
        const adminId = req.admin.id
        const bookingId = req.params.id
        const {bookingStatus} = req.body

        //find admin
        const findAdmin = await prisma.admin.findUnique({
            where : {
                id : String(adminId)
            }
        })

        if(!findAdmin) {
            return res.status(404).json({
                message : "Admin Not Found",
                success : false
            })
        }

        //find booking 
        const findBooking = await prisma.booking.findUnique({
            where : {
                id : String(bookingId)
            }
        })

        if(!findBooking) {
            return res.status(404).json({
                message : "Booking Not found",
                success : false
            })
        }

        //find if already booked
        if(findBooking.bookingStatus === "Confirmed"){
            return res.status(200).json ({
                message : "Booking already confirmed",
                success : true
            })
        }

        if(findBooking.bookingStatus === "Cancelled"){
            return res.status(200).json ({
                message : "Booking already cancelled",
                success : true
            })
        }

        //update booking status
        const updateBookingStatus = await prisma.booking.update({
            where : {
                id : String(bookingId)
            },
            data : {
                bookingStatus: bookingStatus || undefined
            }
        })
        return res.status(200).json({
            message: "Booking status updated successfully.",
            success: true,
            booking: updateBookingStatus,
          });
        } catch (error) {
          console.error("Error updating booking status:", error);
          return res.status(500).json({
            message: "An error occurred while updating the booking status.",
            success: false,
            error: error.message,
          });
        }
      };
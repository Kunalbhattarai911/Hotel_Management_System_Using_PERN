import prisma from "../database/db.config.js";

export const hotelRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const hotelId = req.params.id;
    const { rating, comment } = req.body;

    // Find hotel
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

    // Check if this user has already rated this hotel
    const isRated = await prisma.rating.findUnique({
      where: {
        userId_hotelId: {
          userId: String(userId),
          hotelId: String(hotelId),
        },
      },
    });

    if (isRated) {
      return res.status(400).json({
        message: "You have already rated this hotel",
        success: false,
      });
    }

    // Create a new rating
    const newRating = await prisma.rating.create({
      data: {
        rating,
        comment,
        userId: String(userId),
        hotelId: String(hotelId),
      },
    });

    // Fetch all ratings for the hotel to calculate the new average
    const hotelRatings = await prisma.rating.findMany({
      where: {
        hotelId: String(hotelId),
      },
    });

    const averageRating =
      hotelRatings.reduce((sum, r) => sum + r.rating, 0) / hotelRatings.length;

    // Update hotel rating
    await prisma.hotel.update({
      where: {
        id: String(hotelId),
      },
      data: {
        rating: averageRating,
      },
    });

    return res.status(201).json({
      message: "Rating submitted successfully",
      success: true,
      rating: newRating,
    });
  } catch (error) {
    console.error("Error while rating hotel", error);
    return res.status(500).json({
      message: "An error occurred while submitting the rating",
      success: false,
      error: error.message,
    });
  }
};

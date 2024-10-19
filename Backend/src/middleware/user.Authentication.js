import jwt from "jsonwebtoken";
import prisma from "../database/db.config.js";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //check if it is a user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "Access Denied. Not a user",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error Details:", error);
    return res.status(500).json({
      message: "Invalid or Expired Token",
      success: false,
      error: error.message,
    });
  }
};

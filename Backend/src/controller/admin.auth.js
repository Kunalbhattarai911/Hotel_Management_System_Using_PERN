import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../database/db.config.js";

export const registerAdmin = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      location,
      age,
      phoneNumber,
    } = req.body;

    const findEmail = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      return res.status(400).json({
        message:
          "The Provided Email is already registered. Please try with another valid email",
        success: false,
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const createAdmin = await prisma.admin.create({
      data: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        location: location,
        age: age,
        phoneNumber: phoneNumber,
      },
    });

    return res.status(201).json({
      message: "Admin Created Successfully",
      success: true,
      data: createAdmin,
    });
  } catch (error) {
    console.error("Error Creating Admin", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//login

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findAdmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!findAdmin) {
      return res.status(404).json({
        message: "Email Or Password Doesnot match",
      });
    }

    //check if the admin status is accept or not
    if (findAdmin.status === "Reject") {
      return res.status(403).json({
        message: "Your account has been rejected. Please contact support",
        success: false,
      });
    }

    if (findAdmin.status === "Pending") {
      return res.status(403).json({
        message:
          "Your account is in pending approval. Please wait for conformation",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, findAdmin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Email Or Password Doesnot match",
        success: false,
      });
    }

    const token = jwt.sign(
      { email: findAdmin.email, id: findAdmin.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login Successfull",
      success: true,
      token: token,
      data: {
        id: findAdmin.id,
        firstName: findAdmin.firstName,
        middleName: findAdmin.middleName,
        lastName: findAdmin.lastName,
        email: findAdmin.email,
        location: findAdmin.location,
        age: findAdmin.age,
        phoneNumber: findAdmin.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error Logging Admin", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

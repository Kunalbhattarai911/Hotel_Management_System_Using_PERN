import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/db.config.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, location, phoneNumber } = req.body;

    //check email exist or not
    const findEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findEmail) {
      return res.status(401).json({
        message:
          "This Email Already Exists. Please Try With Another Valid Email",
        success: false,
      });
    }

    //hash password
    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    //register user
    const register = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
        location: location,
        phoneNumber: phoneNumber,
      },
    });

    //remove password from response
    const { password: pass, ...registerData } = register;
    return res.status(201).json({
      message: "User Created Success",
      success: true,
      data: registerData,
    });
  } catch (error) {
    console.error("Error Registering User", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find email
    const findEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!findEmail) {
      return (
        res.status(404).json *
        {
          message: "Email Or Password Doesnot Match",
          success: false,
        }
      );
    }

    //compare password
    const ispasswordMatch = await bcrypt.compare(password, findEmail.password);
    if (!ispasswordMatch) {
      return res.status(403).json({
        message: "Email Or Password Doesnot Match",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: findEmail.id, email: findEmail.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password: pass, ...loginData } = findEmail;

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      token: token,
      data: loginData,
    });
  } catch (error) {
    console.error("Error Login User", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

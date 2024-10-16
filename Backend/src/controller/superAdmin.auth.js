import bcrypt from "bcryptjs";
import prisma from "../database/db.config.js";
import jwt from "jsonwebtoken";

//Register Super Admin
export const registerSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findSuperAdmin = await prisma.superAdmin.findUnique({
      where: {
        isSuperAdmin: true,
      },
    });

    if (findSuperAdmin) {
      return res.status(400).json({
        message: "SuperAdmin is already registered",
        success: false,
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const createSuperAdmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    return res.status(201).json({
      message: "SuperAdmin Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error Creating SuperAdmin", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//Login Super Admin
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findSuperAdmin = await prisma.superAdmin.findUnique({
      where: {
        email: email,
      },
    });

    if (!findSuperAdmin) {
      return res.status(400).json({
        message: "Email Or Password doesnot Match",
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(
      password,
      findSuperAdmin.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        message: "Email Or Password doesnot match",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        email: findSuperAdmin.email,
        id: findSuperAdmin.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
        message : "Login Success",
        success : true,
        token : token,
        data : {
            id : findSuperAdmin.id,
            email : findSuperAdmin.email
        }
    })

} catch (error) {
    console.error("Error Login SuperAdmin", error)
    return res.status(500).json({
        message : "Internal Server Error",
        success : false,
        error : error.message
    })
}
};

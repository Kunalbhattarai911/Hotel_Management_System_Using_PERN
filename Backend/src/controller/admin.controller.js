import prisma from "../database/db.config.js";

//get admin data when it is logged in
export const getAdminData = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const findAdmin = await prisma.admin.findFirst({
      where: {
        id: String(adminId),
      },
    });

    if (!findAdmin) {
      return res.status(404).json({
        message: "Admin Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Admin Data Retrived Successfully",
      success: true,
      data: findAdmin,
    });
  } catch (error) {
    console.error("Error Retriving Admin Data", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//update admin data
export const updateAdminData = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const {
      firstName,
      middleName,
      lastName,
      email,
      location,
      age,
      phoneNumber,
    } = req.body;

    //find email is presented or not
    if (email) {
      const findEmail = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });

      if (findEmail && findEmail.id !== adminId) {
        return res.status(400).json({
          message: "This Email Is Already Registered",
          success: false,
        });
      }
    }

    const updateData = await prisma.admin.update({
        where : {
            id : String(adminId)
        },
        data : {
            firstName : firstName || undefined,
            middleName : middleName || undefined,
            lastName : lastName || undefined,
            email : email || undefined,
            location : location || undefined,
            age : age || undefined,
            phoneNumber : firstName || undefined,
        }
    })

    return res.status(201).json({
        message : "Admin Profile Updated Success",
        success : true,
        data : updateData
    })
  }catch (error) {
    console.error("Error updating Admin Data", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

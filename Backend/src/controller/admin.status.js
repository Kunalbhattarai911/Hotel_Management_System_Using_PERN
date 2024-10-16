import prisma from "../database/db.config.js";

export const changeAdminStatus = async (req, res) => {
  try {
    const superAdmin = req.superAdmin.id;
    const adminid = req.params.id;
    const { status } = req.body;

    const findAdmin = await prisma.admin.findFirst({
      where: {
        id: String(adminid),
      },
    });

    if (!findAdmin) {
      return res.status(404).json({
        message: "Admin not found.",
        success: false,
      });
    }

    if(findAdmin.status === "Accept") {
        return res.status(200).json({
            message : "This Account is already accepted",
            success : true
        })
    }

    //update admin status

    const updateAdminStatus = await prisma.admin.update({
      where: {
        id: String(adminid),
      },
      data: {
        status: status,
      },
    });

    return res.status(200).json({
      message: `Admin status changed to '${status}' successfully.`,
      success: true,
      data: updateAdminStatus,
    });
  } catch (error) {
    console.error("Error changing admin status", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

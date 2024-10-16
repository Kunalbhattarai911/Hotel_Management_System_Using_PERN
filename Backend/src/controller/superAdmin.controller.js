import prisma from "../database/db.config.js";
import bcrypt from 'bcryptjs';

//Get All Admin By SuperAdmin
export const getAllAdmin = async (req, res) => {
  try {
    const superAdmin = req.superAdmin.id;

    const getAllAdmin = await prisma.admin.findMany();

    if (getAllAdmin.length === 0) {
      return res.status(200).json({
        message: "No Admin Registration Till Now",
        success: true,
      });
    }

    const count = await prisma.admin.count();

    return res.status(200).json({
      message: "Lists Of Admin",
      success: true,
      lists: getAllAdmin,
      Total_Admin_Count: count,
    });
  } catch (error) {
    console.error("Error Retriving Admins By SuperAdmin", error);
    return res.status(500).json({
      message: "Interanl Server Error",
      success: false,
      error: error.message,
    });
  }
};

//Get Data Of SuperAdmin
export const superAdminData = async (req, res) => {
  try {
    const superAdmin = req.superAdmin.id;

    const findSuperAdmin = await prisma.superAdmin.findFirst({
      where: {
        id: String(superAdmin),
      },
    });

    return res.status(200).json({
      message: "SuperAdmin Data Retrived Success",
      success: true,
      data: findSuperAdmin,
    });
  } catch (error) {
    console.error("Error Retriving SuperAdmin", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//update Super Admin Data
export const updateSuperAdminData = async(req, res) => {
    try {
        const superAdmin = req.superAdmin.id;
        const { email, password } = req.body;

        // Find the SuperAdmin by ID
        const findSuperAdmin = await prisma.superAdmin.findUnique({
            where: {
                id: String(superAdmin)
            }
        });


        if (!findSuperAdmin) {
            return res.status(404).json({
                message: "Super Admin Not Found",
                success: false
            });
        }

        // Hash the password if provided
        let hashedPassword = undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);  
        }

        // Update SuperAdmin data
        const updateSuperAdmin = await prisma.superAdmin.update({
            where: {
                id: String(superAdmin)
            },
            data: {
                email: email || undefined,
                password: hashedPassword || undefined  // Use the hashed password
            }
        });

        // Remove password from the response object
        const { password: pass, ...superAdminData } = updateSuperAdmin;

        return res.status(200).json({
            message: "SuperAdmin Data Updated Successfully",
            success: true,
            data: superAdminData 
        });

    } catch (error) {
        console.error("Error Updating SuperAdmin", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};
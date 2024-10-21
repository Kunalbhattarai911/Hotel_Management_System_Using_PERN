import prisma from "../database/db.config.js";

export const addHotel = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { name, location, rating } = req.body;

    //find admin Id
    const findAdmin = await prisma.admin.findUnique({
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

    //addhotel detail
    const addHotel = await prisma.hotel.create({
      data: {
        name,
        location,
        rating,
        adminId: String(adminId)
      },
    });

    return res.status(201).json({
      message: "Hotel Added Successfully",
      success: true,
      data: addHotel,
    });
  } catch (error) {
    console.error("Error Adding Hotel", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//get all hotel
export const getAllHotel = async(req,res) => {
  try {
    const adminId = req.admin.id

    if(!adminId){
      return res.status(403).json({
        message : "Admin Id Not Found",
        success : false
      })
    }

    const getData = await prisma.hotel.findMany()

    return res.status(200).json({
      message : "Hotel Data",
      success : true,
      Lists : getData
    })
  }  catch (error) {
    console.error("Error Retriving Hotel", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//get hotel by id
export const getHotelByID = async(req,res) => {
   try {
    const adminId = req.admin.id
    const hotelId = req.params.id

    const findHotel = await prisma.hotel.findUnique({
      where : {
        id : String(hotelId)
      }
    })

    if(!findHotel) {
      return res.status(404).json({
        message : "Hotel Not Found",
        success : false
      })
    }

    //get hotel by id
    const getHotel = await prisma.hotel.findFirst({
      where : {
        id : String(hotelId),
        adminId : String(adminId)
      }
    })

    return res.status(200).json({
      message : "Hotel Detail",
      success : true,
      Details : getHotel
    })
   } catch (error) {
    console.error("Error Retriving Hotel", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//update hotel info
export const updateHotelInfo = async(req,res) => {
  try {
    const hotelId = req.params.id
    const adminId = req.admin.id
    const {name, location} = req.body

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where : { 
        id : String(hotelId)
      }
    })

    if(!findHotel) {
      return res.status(404).json({
        message : "Hotel Not Found",
        success : false
      })
    }

    //const update data
    const updateData = await prisma.hotel.update({
      where : {
        id : String(hotelId),
        adminId : String(adminId)
      },
      data : {
        name : name || undefined,
        location : location || undefined
      }
    })

    return res.status(201).json({
      message : "Hotel updated success",
      success : true,
      UpdatedData : updateData
    })
  } catch (error) {
    console.error("Error Updating Hotel Data", error)
    return res.status(500).json({
      message : "Internal Server Error",
      success : false,
      error : error.message
    })
  }
}

//delete hotel
export const deleteHotel = async(req,res) => {
  try {
    const adminId = req.admin.id
    const hotelId = req.params.id

    //find hotel
    const findHotel = await prisma.hotel.findUnique({
      where : {
        id : String(hotelId)
      }
    })

    if(!findHotel) {
      return res.status(404).json({
        message : "Hotel Not Found",
        success : false
      })
    }

    //const delete hotel
    await prisma.hotel.delete({
      where : {
        id : String(hotelId),
        adminId : String(adminId)
      }
    })

    return res.status(200).json({
      message : "Hotel Data Deleted Success",
      success : true
    })
  } catch (error) {
    console.error("Error Deleting Hotel", error)
    return res.status(500).json({
      message : "Internal Server Error",
      success : false,
      error : error.message
    })
  }
}
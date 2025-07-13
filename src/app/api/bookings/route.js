// import { NextResponse } from "next/server"
// import Booking from "@/models/Booking"
// import Room from "@/models/Room"
// import { connectDb } from "@/helper/db"

// export async function GET() {
//   try {
//     await connectDb()
//     const bookings = await Booking.find({})
//       .populate("userId", "name email phone image")
//       .populate("roomId", "roomNumber roomType price")
//     return NextResponse.json({
//       success: true,
//       data: bookings,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error fetching bookings",
//         error: error.message,
//       },
//       { status: 500 },
//     )
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDb()
//     const data = await req.json()

//     // Check room availability
//     const room = await Room.findById(data.roomId)
//     if (!room || !room.isAvailable) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Room is not available",
//         },
//         { status: 400 },
//       )
//     }

//     const booking = await Booking.create(data)

//     // Update room availability
//     await Room.findByIdAndUpdate(data.roomId, { isAvailable: false })

//     return NextResponse.json(
//       {
//         success: true,
//         data: booking,
//         message: "Booking created successfully",
//       },
//       { status: 201 },
//     )
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error creating booking",
//         error: error.message,
//       },
//       { status: 500 },
//     )
//   }
// }

import { NextResponse } from "next/server"
import Booking from "@/models/Booking"
import Room from "@/models/Room"
import { connectDb } from "@/helper/db"

export async function GET() {
  try {
    await connectDb()
    const bookings = await Booking.find({})
      .populate("userId", "name email phone image")
      .populate("roomId", "roomNumber roomType price")
    return NextResponse.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching bookings",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(req) {
  try {
    await connectDb()
    const data = await req.json()
    // Check room availability
    const room = await Room.findById(data.roomId)
    if (!room || !room.isAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: "Room is not available",
        },
        { status: 400 },
      )
    }
    const booking = await Booking.create(data)
    // Update room availability to false when a booking is created
    await Room.findByIdAndUpdate(data.roomId, { isAvailable: false })
    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: "Booking created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error creating booking",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

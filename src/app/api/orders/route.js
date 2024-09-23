import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { totalPrice, basket, userId } = body;
    await orderModel.create({
      userId,
      totalPrice,
      basket,
    });
    return Response.json(
      { message: "order created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();
    const orders = await orderModel.find({}, "-__v");
    return Response.json(orders);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

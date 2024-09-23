import connectToDB from "@/configs/db";
import BrandModel from "@/models/Brand";

export async function POST(req, res) {
  try {
    connectToDB();
    const { title } = await req.json();
    const brand = await BrandModel.create({ title });
    return Response.json(
      { message: "New brand created successfully", data: brand },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();
    const brands = await BrandModel.find({});
    return Response.json(brands);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

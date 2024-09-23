import connectToDB from "@/configs/db";
import CategoryModel from "@/models/Category";

export async function POST(req, res) {
  try {
    connectToDB();
    const { title } = await req.json();
    const brand = await CategoryModel.create({ title });
    return Response.json(
      { message: "New category created successfully", data: brand },
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
    const categories = await CategoryModel.find({});
    return Response.json(categories);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export async function GET(req, { params }) {
  try {
    connectToDB();
    const categoryId = params.id;
    const filteredCategories = await productModel.find({ category: categoryId });
    return Response.json(filteredCategories);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export async function GET(req, { params }) {
  try {
    connectToDB();
    const productID = params.id;
    const mainProduct = await productModel.find({ _id: productID });
    return Response.json(mainProduct, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export async function GET(req, { params }) {
  try {
    connectToDB();
    const brandId = params.id;
    const filteredBrands = await productModel.find({ brand: brandId });
    return Response.json(filteredBrands);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import wishlistModel from "@/models/Wishlist";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { userId, productId } = body;

    const isWishItemExist = await wishlistModel.findOne({ userId, productId });

    if (!isWishItemExist) {
      await wishlistModel.create({ userId, productId });
      return Response.json(
        { message: "Product added to wishlist successfully" },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: "Product exist in wishlist already" },
        { status: 435 }
      );
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

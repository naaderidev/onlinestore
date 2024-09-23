import connectToDB from "@/configs/db";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/authentication/serverHelpers";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: "unAthorized Error" }, { status: 401 });
    }

    const productID = params.id;
    await wishlistModel.findOneAndDelete({
      userId: user._id,
      productId: productID,
    });
    return Response.json(
      { message: "Product deleted from wishlist successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

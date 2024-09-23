import connectToDB from "@/configs/db";
import discountModel from "@/models/Discount";

export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { code } = body;
    const discount = await discountModel.findOne({ code });
    await discountModel.findOneAndUpdate({ code }, { $inc: { countUse: 1 } });
    if (!discount) {
      return Response.json({ message: "discount not found!" }, { status: 437 });
    } else if (discount.maxUse <= discount.countUse) {
      return Response.json(
        { message: "discount is expired!" },
        { status: 436 }
      );
    } else {
      return Response.json(
        discount,
        { message: "discount is ok" },
        { status: 200 }
      );
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

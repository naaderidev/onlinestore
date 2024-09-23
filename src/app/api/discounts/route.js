import connectToDB from "@/configs/db";
import discountModel from "@/models/Discount";
// import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { code, percent, maxUse, desc } = body;
    await discountModel.create({ code, percent, maxUse, desc });
    return Response.json(
      { message: "New discount created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    await discountModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "Discount deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id, code, percent, maxUse, desc } = body;
    await discountModel.findOneAndUpdate(
      { _id: id },
      { $set: { code, percent, maxUse, desc } }
    );

    return Response.json(
      { message: "code updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

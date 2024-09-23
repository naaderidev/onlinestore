import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { authUser } from "@/utils/authentication/serverHelpers";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { name, phone, email, address, zip } = body;
    const user = authUser();
    await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, phone, email, address, zip } }
    );
    return Response.json(
      { message: "user info updated successfully" },
      { status: 200 }
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
    await userModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { cookies } from "next/dist/client/components/headers";
import { verifyAccessToken } from "@/utils/authentication/auth";

export async function GET() {
  try {
    connectToDB();
    const token = cookies().get("token");
    let user = null;

    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await userModel.findOne({ email: tokenPayload.email });
      }
      return Response.json(user);
    } else {
      return Response.json(
        { message: "acess denied", data: null },
        { status: 401 }
      );
    }
  } catch (err) {
    return Response.json({ message: "unknown server error" }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { generateAccessToken } from "@/utils/authentication/auth";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    connectToDB();
    const refreshToken = cookies().get("refresh-token").value;
    if (!refreshToken) {
      return Response.json({ message: "unAuthorized erroe!" }, { status: 401 });
    }
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      return Response.json({ message: "unAuthorized erroe!" }, { status: 401 });
    }

    verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    const newAccessToken = generateAccessToken({ email: user.email });

    return Response.json(
      { message: "new access token generated successfully!!" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import otpModel from "@/models/Otp";
import userModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/authentication/auth";

export async function POST(req) {
  connectToDB();

  const body = await req.json();
  const { phone, code } = body;
  const user = await userModel.findOne({ phone });
  const email = user.email;

  const otp = await otpModel.findOne({ phone, code });
  if (otp) {
    const date = new Date();
    const now = date.getTime();
    if (otp.expTime > now) {
      const accessToken = generateAccessToken({ email });
      const refreshToken = generateRefreshToken({ email });
      await userModel.findOneAndUpdate(
        { email },
        {
          $set: {
            refreshToken: refreshToken,
          },
        }
      );
      return Response.json(
        { message: "code is valid :)" },
        {
          status: 200,
          headers: {
            "Set-Cookie": `token = ${accessToken}; path=/; httpOnly=true`,
          },
        }
      );
    } else {
      return Response.json({ message: "code is expired :(" }, { status: 410 });
    }
  } else {
    return Response.json({ message: "code is invalid!" }, { status: 409 });
  }
}

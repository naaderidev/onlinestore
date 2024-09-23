import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/authentication/auth";

export async function POST(req) {
  const body = await req.json();
  try {
    connectToDB();
    const { email, password } = body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "user not found!" }, { status: 422 });
    }
    const isHashedPasswordCorrect = await verifyPassword(
      password,
      user.password
    );
    if (!isHashedPasswordCorrect) {
      return Response.json(
        { message: "email or password is invalid!" },
        { status: 433 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;`
    );

    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken: refreshToken,
        },
      }
    );

    return Response.json(
      { message: "user logged in successfully" },
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    return Response.json({ message: "unknown server error" }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import otpModel from "@/models/Otp";
import userModel from "@/models/User";

export async function POST(req) {
  connectToDB();

  const body = await req.json();
  const { phone } = body;
  const code = Math.floor(Math.random() * 99999);
  const date = new Date();
  const expTime = date.getTime() + 300000;

  const user = await userModel.findOne({ phone });
  if (!user) {
    return Response.json({ message: "user not found!" }, { status: 422 });
  }

  try {
    const response = await fetch("http://ippanel.com/api/select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        op: "pattern",
        user: "u09193571290",
        pass: "Faraz@1457490370445325",
        fromNum: "+9810003632288362",
        toNum: phone,
        patternCode: "hxda3zehtj4gjmi",
        inputData: [{ "verification-code": code }],
      }),
    });

    if (response.ok) {
      await otpModel.create({
        phone,
        code,
        expTime,
      });
      console.log(await response.json());
    } else {
      console.log("nok!");
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
  }

  return Response.json({ message: "code send" }, { status: 201 });
}

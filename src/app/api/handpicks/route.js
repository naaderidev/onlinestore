import connectToDB from "@/configs/db";
import handpickModel from "@/models/Handpick";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const image = formData.get("image");

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name;
    const imagePath = path.join(process.cwd(), "public/uploads/" + filename);
    await writeFile(imagePath, buffer);

    const product = await handpickModel.create({
      title,
      image: `http://localhost:8000/uploads/${filename}`,
    });

    return Response.json(
      { message: "New hadnpick created successfully", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log("err:::", err);
    return Response.json(
      { message: err.message || "Error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    connectToDB();
    const handpicks = await handpickModel.find({}, "-__v");
    return Response.json(handpicks);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

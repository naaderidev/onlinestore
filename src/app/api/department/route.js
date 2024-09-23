import connectToDB from "@/configs/db";
import departmentModel from "@/models/Department";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { title } = reqBody;

    await departmentModel.create({
      title,
    });
    return Response.json(
      { message: "department created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();
    const departments = await departmentModel.find({});
    return Response.json(departments);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

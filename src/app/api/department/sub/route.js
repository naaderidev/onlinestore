import connectToDB from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { title, department } = reqBody;

    await subDepartmentModel.create({
      title,
      department,
    });
    return Response.json(
      { message: "subdepartment created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();
    const subDepartments = await subDepartmentModel.find({});
    return Response.json(subDepartments);
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

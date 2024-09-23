import connectToDB from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(req, { params }) {
  try {
    connectToDB();
    const id = params.id;
    if (!isValidObjectId(id)) {
      return Response.json({ message: "ID is not valid" }, { status: 422 });
    }
    const subDepartments = await subDepartmentModel.find({ department: id });
    return Response.json(subDepartments, { status: 200 });
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

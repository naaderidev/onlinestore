import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/authentication/serverHelpers";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });
    return Response.json(
      { message: "ticket created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    await ticketModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "ticket deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

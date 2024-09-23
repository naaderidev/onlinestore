import connectToDB from "@/configs/db";
import contactModel from "@/models/Contact";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { name, email, phone, message } = body;

    await contactModel.create({
      name,
      email,
      phone,
      message,
    });

    return Response.json(
      { message: "New message sent successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    await contactModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "message deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

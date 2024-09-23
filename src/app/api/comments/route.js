import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import commentModel from "@/models/Comment";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    console.log('reqBody:', reqBody);
    const { name, email, body, score, productId } = reqBody;

    const comment = await commentModel.create({
      name,
      email,
      body,
      score,
      productId,
    });
    console.log('comment:::', comment);
    await productModel.findOneAndUpdate(
      { _id: productId },
      { $push: { comments: comment._id } }
    );

    return Response.json(
      { message: "New comment created successfully", data: comment },
      { status: 201 }
    );
  } catch (err) {
    console.log('err::', err);
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { id, body } = reqBody;

    await commentModel.findOneAndUpdate({ _id: id }, { $set: { body: body } });

    return Response.json(
      { message: "comment edited successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  const comments = await commentModel.find({}, "-__v");
  return Response.json(comments);
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    await commentModel.findOneAndDelete({ _id: id });

    return Response.json(
      { message: "comment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const brand = formData.get("brand");
    const isOnSale = formData.get("isOnSale");
    const discount = formData.get("discount");
    const purchaseDate = formData.get("purchaseDate");
    const receiveDate = formData.get("receiveDate");

    // Prepare variants
    const variants = [];

    for (let i = 0; i < formData.get("variantCount"); i++) {
      // Assume `variantCount` indicates how many variants there are
      const color = formData.get(`variant[${i}][color]`);
      const price = formData.get(`variant[${i}][price]`);
      const quantity = formData.get(`variant[${i}][quantity]`);
      const size = formData.get(`variant[${i}][size]`);
      const imageFile = formData.get(`variant[${i}][image]`);

      // Handle image upload and conversion to buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      const imagePath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(imagePath, buffer);

      // Add variant to the array
      variants.push({
        color,
        price,
        quantity,
        size,
        image: `http://localhost:8000/uploads/${filename}`, // Adjust URL as needed
      });
    }

    // console.log(Array.from(formData.entries()));

    const product = await productModel.create({
      title,
      category,
      brand,
      variants,
      isOnSale,
      discount,
      purchaseDate,
      receiveDate,
    });

    return Response.json(
      { message: "New product created successfully", data: product },
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
  connectToDB();
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("q");
  try {
    if (param) {
      const searchedProducts = await productModel.find({
        // $text: { $search: param } 
        title: { $regex: new RegExp(param, 'i') }
      });
      return Response.json(searchedProducts);
    } else {
      const products = await productModel.find({}, "-__v").populate("comments");
      return Response.json(products);
    }
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

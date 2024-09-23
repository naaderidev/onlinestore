import { cookies } from "next/dist/client/components/headers";

export async function POST() {
  try {
    cookies().delete("token");
    return Response.json({ message: "logout successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "unknown server error" }, { status: 500 });
  }
}

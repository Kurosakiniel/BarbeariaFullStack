import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    // ver se já existe usuário
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      );
    }

    // hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // criar usuário (barbeiro/admin)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
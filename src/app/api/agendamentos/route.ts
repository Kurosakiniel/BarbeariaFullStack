import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agendamento from "@/models/Agendamento";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const agendamento = await Agendamento.create(body);

    return NextResponse.json(agendamento, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    );
  }
}
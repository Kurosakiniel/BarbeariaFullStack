import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agendamento from "@/models/Agendamento";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // 👈 CORREÇÃO PRINCIPAL

    const body = await req.json();

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!agendamentoAtualizado) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(agendamentoAtualizado);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // 👈 ISSO AQUI É A CORREÇÃO

    const dados = await req.json();

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      id,
      dados,
      { new: true, runValidators: true }
    );

    if (!agendamentoAtualizado) {
      return NextResponse.json(
        { erro: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(agendamentoAtualizado);
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // 👈 CORREÇÃO PRINCIPAL

    const deletado = await Agendamento.findByIdAndDelete(id);

    if (!deletado) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Agendamento deletado com sucesso",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
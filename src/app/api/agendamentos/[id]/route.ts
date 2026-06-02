import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agendamento from "@/models/Agendamento";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await req.json();

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      params.id,
      body,
      { new: true } // retorna o documento atualizado
    );

    if (!agendamentoAtualizado) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(agendamentoAtualizado);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar agendamento" },
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
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deletado = await Agendamento.findByIdAndDelete(params.id);

    if (!deletado) {
      return NextResponse.json(
        { error: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Agendamento deletado com sucesso" });
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar agendamento" },
      { status: 500 }
    );
  }
}
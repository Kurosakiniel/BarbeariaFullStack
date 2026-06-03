import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import AgendamentoModel from "@/models/Agendamento";
import type { Agendamento } from "@/types";
import DeleteButton from "@/components/DeleteButton";
import { CalendarDays,Plus,Clock,Pencil,Scissors } from "lucide-react";

async function getAgendamentos(): Promise<Agendamento[]> {
  await dbConnect();
  const agendamentos = await AgendamentoModel.find().lean();
  return JSON.parse(JSON.stringify(agendamentos));
}

export default async function AgendamentosPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const agendamentos = await getAgendamentos();

  return (
    <div className="flex flex-col gap-8">

      {/* TÍTULO */}
      <div>
        <p className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">
          Gestão
        </p>

        <h1 className="text-2xl font-bold text-white">
          Agendamentos
        </h1>
      </div>

      {/* BOTÃO */}
      <div>
        <Link
          href="/dashboard/agendamentos/novo"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-amber-500/20
            bg-amber-500/10
            px-4
            py-2.5
            text-sm
            font-medium
            text-amber-400
            transition
            hover:bg-amber-500/20
          "
        >
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </Link>
      </div>

      {/* TABELA */}
      <div className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-[#222] flex items-center gap-3">
          <CalendarDays className="w-4 h-4 text-amber-500" />

          <h2 className="text-white font-semibold text-sm">
            Todos os Agendamentos
          </h2>
        </div>

        <table className="w-full">

          <thead>
            <tr className="border-b border-[#1e1e1e]">

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Cliente
              </th>

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Serviço
              </th>

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Data
              </th>

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Horário
              </th>

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Status
              </th>

              <th className="text-left px-6 py-3 text-[11px] tracking-[0.12em] text-zinc-500 uppercase font-semibold">
                Ações
              </th>

            </tr>
          </thead>

          <tbody>

            {agendamentos.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-zinc-600 text-sm"
                >
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            )}

            {agendamentos.map((item) => (
              <tr
                key={item._id}
                className="
                  border-b
                  border-[#1a1a1a]
                  hover:bg-[#161616]
                  transition-colors
                "
              >
                <td className="px-6 py-4 text-white text-sm font-medium">
                  {item.cliente}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 font-medium">
                    <Scissors className="w-3 h-3" />
                    {item.servico}
                  </span>
                </td>

                <td className="px-6 py-4 text-zinc-300 text-sm">
                  {item.data}
                </td>

                <td className="px-6 py-4 text-zinc-300 text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {item.horario}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-3 py-1 font-medium capitalize">
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">

                    <Link
                      href={`/dashboard/agendamentos/edit/${item._id}`}
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-zinc-400
                        hover:text-amber-400
                        transition-colors
                        px-3
                        py-1.5
                        rounded-lg
                        hover:bg-amber-500/10
                        border
                        border-transparent
                        hover:border-amber-500/20
                      "
                    >
                      <Pencil className="w-3 h-3" />
                      Editar
                    </Link>

                    <DeleteButton id={item._id} />

                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}
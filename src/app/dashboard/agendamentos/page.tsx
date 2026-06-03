import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import AgendamentoModel from "@/models/Agendamento";
import type { Agendamento } from "@/types";
import DeleteButton from "@/components/DeleteButton";

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
    <div>
      <h1>Agendamentos</h1>

      <Link
        href="/dashboard/agendamentos/novo"
        style={{ display: "inline-block", margin: "10px 0", padding: "8px", border: "1px solid black", textDecoration: "none" }}
      >
        + Novo Agendamento
      </Link>

      <table border={1} cellPadding={10} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((item) => (
            <tr key={item._id}>
              <td>{item.cliente}</td>
              <td>{item.servico}</td>
              <td>{item.data}</td>
              <td>{item.horario}</td>
              <td>{item.status}</td>
              <td>
                <Link href={`/dashboard/agendamentos/edit/${item._id}`}>
                  Editar
                </Link>
                <DeleteButton id={item._id} /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
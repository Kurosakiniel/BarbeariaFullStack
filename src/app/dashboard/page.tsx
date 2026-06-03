import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import AgendamentoModel from "@/models/Agendamento";
import type { Agendamento } from "@/types";
import DeleteButton from "@/components/DeleteButton";

async function getAgendamentosHoje(): Promise<Agendamento[]> {
  await dbConnect();

  const hoje = new Date().toISOString().split("T")[0]; // "2026-06-03"

  const agendamentos = await AgendamentoModel.find({ data: hoje }).lean();
  return JSON.parse(JSON.stringify(agendamentos));
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const agendamentos = await getAgendamentosHoje();

  return (
    <div>
      <h1>Dashboard</h1>

      {/* CARD */}
      <div style={{
        display: "inline-block",
        padding: "20px 40px",
        border: "1px solid #ccc",
        borderRadius: 8,
        margin: "20px 0",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>Clientes hoje</p>
        <p style={{ fontSize: 48, fontWeight: "bold", margin: 0 }}>{agendamentos.length}</p>
      </div>

      {/* TABELA */}
      <table border={1} cellPadding={10} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Horário</th>
            <th>Serviço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#999" }}>
                Nenhum agendamento para hoje.
              </td>
            </tr>
          )}
          {agendamentos.map((item) => (
            <tr key={item._id}>
              <td>{item.cliente}</td>
              <td>{item.horario}</td>
              <td>{item.servico}</td>
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
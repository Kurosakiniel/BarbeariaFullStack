import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Agendamento = {
  _id: string;
  cliente: string;
  servico: string;
  data: string;
  horario: string;
  status: string;
};

async function getAgendamentos(): Promise<Agendamento[]> {
  const res = await fetch("http://localhost:3000/api/agendamentos", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar agendamentos");
  }

  return res.json();
}

export default async function AgendamentosPage() {
  // 🔐 proteção
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 📦 dados
  const agendamentos = await getAgendamentos();

  return (
    <div>
      <h1>Agendamentos</h1>

      {/* BOTÃO FUTURO */}
      <button style={{ margin: "10px 0", padding: "8px" }}>
        + Novo Agendamento
      </button>

      {/* TABELA */}
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
                <button>Editar</button>
                <button style={{ marginLeft: 8, color: "red" }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
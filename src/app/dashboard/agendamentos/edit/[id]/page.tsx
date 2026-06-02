import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  params: {
    id: string;
  };
};

async function getAgendamento(id: string) {
  const res = await fetch(`http://localhost:3000/api/agendamentos`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.find((item: any) => item._id === id);
}

export default async function EditAgendamentoPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const agendamento = await getAgendamento(params.id);

  if (!agendamento) {
    return <h1>Agendamento não encontrado</h1>;
  }

  return (
    <div>
      <h1>Editar Agendamento</h1>

      {/* FORM SIMPLES (vamos melhorar depois) */}
      <form
        action={`/api/agendamentos/${params.id}`}
        method="POST"
      >
        <input
          name="cliente"
          defaultValue={agendamento.cliente}
          placeholder="Cliente"
        />

        <input
          name="servico"
          defaultValue={agendamento.servico}
          placeholder="Serviço"
        />

        <input
          name="data"
          defaultValue={agendamento.data}
        />

        <input
          name="horario"
          defaultValue={agendamento.horario}
        />

        <button type="submit">
          Salvar
        </button>
      </form>
    </div>
  );
}
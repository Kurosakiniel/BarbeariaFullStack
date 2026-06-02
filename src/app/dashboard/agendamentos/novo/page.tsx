"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoAgendamentoPage() {
  const router = useRouter();

  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cliente,
        servico,
        data,
        horario,
      }),
    });

    if (res.ok) {
      alert("Agendamento criado com sucesso!");
      router.push("/dashboard/agendamentos");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Erro ao criar agendamento");
    }
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h1>Novo Agendamento</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <input
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />

        <button type="submit">
          Criar Agendamento
        </button>
      </form>
    </div>
  );
}
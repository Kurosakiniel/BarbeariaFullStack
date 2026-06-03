"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoAgendamentoPage() {
  const router = useRouter();

  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, servico, data, horario }),
    });

    if (res.ok) {
      router.push("/dashboard/agendamentos");
      router.refresh(); // ✅ faz a tabela rebuscar os dados
    } else {
      const json = await res.json();
      alert(json.error || "Erro ao criar agendamento");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h1>Novo Agendamento</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />
        <input
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Agendamento"}
        </button>
      </form>
    </div>
  );
}
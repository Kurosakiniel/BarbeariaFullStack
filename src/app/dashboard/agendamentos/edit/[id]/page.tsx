"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditAgendamentoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [status, setStatus] = useState("agendado");
  const [loading, setLoading] = useState(false);

  // busca os dados atuais do agendamento
  useEffect(() => {
    fetch(`/api/agendamentos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCliente(data.cliente);
        setServico(data.servico);
        setData(data.data);
        setHorario(data.horario);
        setStatus(data.status);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/agendamentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, servico, data, horario, status }),
    });

    if (res.ok) {
      router.push("/dashboard/agendamentos");
      router.refresh();
    } else {
      const json = await res.json();
      alert(json.error || "Erro ao editar agendamento");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h1>Editar Agendamento</h1>

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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="agendado">Agendado</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
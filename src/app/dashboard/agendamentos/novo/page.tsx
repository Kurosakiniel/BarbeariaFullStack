"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, Scissors, User, Plus } from "lucide-react";

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
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* TÍTULO */}
      <div>
        <p className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">
          Cadastro
        </p>

        <h1 className="text-2xl font-bold text-white">
          Novo Agendamento
        </h1>
      </div>

      {/* FORM */}
      <div className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-[#222] flex items-center gap-3">
          <Plus className="w-4 h-4 text-amber-500" />

          <h2 className="text-white font-semibold text-sm">
            Dados do Agendamento
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-5"
        >
          {/* CLIENTE */}
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
              <User className="w-4 h-4 text-amber-500" />
              Cliente
            </label>

            <input
              placeholder="Nome do cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              className="
                w-full
                bg-[#181818]
                border
                border-[#2a2a2a]
                rounded-lg
                px-4
                py-3
                text-white
                placeholder:text-zinc-600
                outline-none
                focus:border-amber-500/50
              "
            />
          </div>

          {/* SERVIÇO */}
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
              <Scissors className="w-4 h-4 text-amber-500" />
              Serviço
            </label>

            <input
              placeholder="Ex: Corte + Barba"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              required
              className="
                w-full
                bg-[#181818]
                border
                border-[#2a2a2a]
                rounded-lg
                px-4
                py-3
                text-white
                placeholder:text-zinc-600
                outline-none
                focus:border-amber-500/50
              "
            />
          </div>

          {/* DATA E HORÁRIO */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                <CalendarDays className="w-4 h-4 text-amber-500" />
                Data
              </label>

              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                className="
                  w-full
                  bg-[#181818]
                  border
                  border-[#2a2a2a]
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500/50
                "
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Horário
              </label>

              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                className="
                  w-full
                  bg-[#181818]
                  border
                  border-[#2a2a2a]
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-amber-500/50
                "
              />
            </div>

          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-2
              h-12
              rounded-lg
              bg-amber-500
              text-black
              font-semibold
              transition-all
              hover:bg-amber-400
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Criando..." : "Criar Agendamento"}
          </button>

        </form>

      </div>
    </div>
  );
}
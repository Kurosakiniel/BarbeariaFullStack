"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { User, Scissors, CalendarDays, Clock, Pencil, CheckCircle} from "lucide-react";

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
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* TÍTULO */}
      <div>
        <p className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold mb-1">
          Edição
        </p>

        <h1 className="text-2xl font-bold text-white">
          Editar Agendamento
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-[#111111] border border-[#222] rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-[#222] flex items-center gap-3">
          <Pencil className="w-4 h-4 text-amber-500" />

          <h2 className="text-white font-semibold text-sm">
            Atualizar Dados
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

          {/* STATUS */}
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            >
              <option value="agendado">Agendado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
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
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>

        </form>

      </div>

    </div>
  );
}
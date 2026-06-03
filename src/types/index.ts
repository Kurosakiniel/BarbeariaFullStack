export type AgendamentoStatus = "agendado" | "concluido" | "cancelado";

export type Agendamento = {
  _id: string;
  cliente: string;
  servico: string;
  data: string;
  horario: string;
  status: AgendamentoStatus;
};

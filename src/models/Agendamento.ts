import { Schema, model, models } from "mongoose";

const AgendamentoSchema = new Schema(
  {
    cliente: {
      type: String,
      required: true,
    },
    servico: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    horario: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["agendado", "concluido", "cancelado"],
      default: "agendado",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Agendamento ||
  model("Agendamento", AgendamentoSchema);
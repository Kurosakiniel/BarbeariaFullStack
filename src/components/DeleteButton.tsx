"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";

type Props = { id: string };

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const { modalAberto, abrirModal, fecharModal } = useUIStore();

  async function handleConfirmar() {
    await fetch(`/api/agendamentos/${id}`, { method: "DELETE" });
    fecharModal();
    router.refresh();
  }

  return (
    <>
      <button
        onClick={abrirModal}
        style={{ marginLeft: 8, color: "red", cursor: "pointer", border: "none", background: "none" }}
      >
        Excluir
      </button>

      {/* MODAL controlado pelo Zustand */}
      {modalAberto && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50,
        }}>
          <div style={{
            background: "#fff", borderRadius: 8,
            padding: 24, width: 320,
          }}>
            <h2 style={{ marginBottom: 8 }}>Confirmar exclusão</h2>
            <p style={{ marginBottom: 16, color: "#666" }}>Tem certeza que deseja excluir este agendamento?</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={fecharModal} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                style={{ padding: "8px 16px", background: "red", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
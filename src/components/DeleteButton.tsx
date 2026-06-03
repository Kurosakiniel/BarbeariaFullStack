"use client";

import { useRouter } from "next/navigation";

type Props = { id: string };

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmado = confirm("Tem certeza que quer excluir?");
    if (!confirmado) return;

    await fetch(`/api/agendamentos/${id}`, { method: "DELETE" });

    router.refresh();
  }

  return (
    <button onClick={handleDelete} style={{ marginLeft: 8, color: "red" }}>
      Excluir
    </button>
  );
}
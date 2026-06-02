import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 🔐 proteção da rota
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "250px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Barbearia</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/agendamentos">Agendamentos</Link>
        </nav>

        <form action="/api/auth/signout" method="POST">
          <button
            style={{
              marginTop: "20px",
              background: "red",
              color: "#fff",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </form>
      </aside>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: "20px" }}>
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>Dashboard</h3>

          <div>
            👤 {session.user?.email}
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
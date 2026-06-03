import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Scissors, CalendarDays, LogOut, User } from "lucide-react";

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
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111111] border-r border-[#222] flex flex-col px-5 py-8 gap-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 rounded-lg p-2">
            <Scissors className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-amber-500 uppercase font-semibold">
              Boa
            </p>
            <h2 className="text-white font-bold text-lg leading-none">
              Barbearia
            </h2>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 flex-1">
          <p className="text-[10px] tracking-[0.15em] text-zinc-500 uppercase mb-1 px-3">
            Menu
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm font-medium"
          >
            <CalendarDays className="w-4 h-4 text-amber-500" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/agendamentos"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm font-medium"
          >
            <CalendarDays className="w-4 h-4 text-amber-500" />
            Agendamentos
          </Link>
        </nav>

        {/* Logout */}
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-colors text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </form>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-[#111111] border-b border-[#222] px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-amber-500 uppercase font-semibold">
              Painel
            </p>
            <h3 className="text-white font-bold text-lg leading-none">
              Dashboard
            </h3>
          </div>

          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-2">
            <div className="bg-amber-500 rounded-full p-1">
              <User className="w-3 h-3 text-black" />
            </div>
            <span className="text-zinc-300 text-sm">{session.user?.email}</span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
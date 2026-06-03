"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Usuário criado com sucesso!");
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-8">

      {/* LADO ESQUERDO */}

      <div className="flex-1 text-white max-w-xl mx-auto pl-24 hidden md:flex flex-col justify-center">

        <p className="uppercase tracking-[6px] text-yellow-500 mb-3">
          Boa Barbearia
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Crie sua <br/>
          conta agora.
        </h1>

        <p className="text-zinc-400 max-w-lg text-lg">
          Agende horários, gerencie clientes e
          organize serviços em um ambiente moderno
          feito para sua barbearia.
        </p>

      </div>

      {/* LADO DIREITO */}

      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleRegister} className="w-full max-w-md bg-zinc-900/80 backdrop-blur-sm border border-yellow-500/20 p-10 rounded-2xl shadow-2xl">

          <p className="text-yellow-500 uppercase tracking-[4px] mb-3 text-center">
            Crie sua conta
          </p>

          <h2 className="text-4xl font-bold mb-10 text-white text-center">
            Cadastro
          </h2>

          <input placeholder="Nome" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-zinc-800
          border border-zinc-700 text-white rounded-lg p-4 mb-4 outline-none focus:border-yellow-500 transition"/>

          <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-4 mb-6 outline-none focus:border-yellow-500 transition"/>

          <div className="relative mb-6">

            <input placeholder="Senha" type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-4 pr-14 outline-none focus:border-yellow-500 transition"/>

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-yellow-500 transition">
            {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
            </button>

          </div>

          <Button
            variant="barbershop"
            type="submit"
            className="h-14 w-full text-base"
          >
            Criar conta
          </Button>

        </form>
      </div>
    </div>
  );
}
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Inicializa o NextAuth com as configurações do auth.ts
const handler = NextAuth(authOptions);

// Exporta os métodos HTTP que o NextAuth precisa
export { handler as GET, handler as POST };
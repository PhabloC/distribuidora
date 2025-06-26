"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Inicializa o cliente Supabase com as credenciais do ambiente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  // Função de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Busca o role do usuário na tabela users_profile
      const userId = data.user?.id;
      if (userId) {
        const { data: profile, error: profileError } = await supabase
          .from("users_profile")
          .select("role")
          .eq("id", userId)
          .single();
        if (!profileError && profile) {
          // Salva no localStorage para uso global
          localStorage.setItem(
            "user",
            JSON.stringify({ id: userId, role: profile.role, email })
          );
        }
      }
      setSuccess("Login bem-sucedido!");
      router.push("/shop/products"); // Redireciona após login
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url(/banner.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div
        className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-xl shadow-lg flex flex-col items-center
      "
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Entrar</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white mb-2"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white mb-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-2 cursor-pointer"
          >
            Entrar
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
        <p className="mt-4 text-gray-700">
          Não tem uma conta?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

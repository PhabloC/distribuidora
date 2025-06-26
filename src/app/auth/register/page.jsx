"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from("users_profile")
          .insert([{ id: userId, role: "client" }]); // Alterado de "cliente" para "client"
        if (profileError) {
          setError("Erro ao criar perfil: " + profileError.message);
          return;
        }
      }
      setSuccess("Registro bem-sucedido! Você será redirecionado.");
      setTimeout(() => router.push("/auth/login"), 1000);
    }
  };

  // Resto do código permanece igual
  // ...
}

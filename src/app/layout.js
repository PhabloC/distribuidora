"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // Carrega o usuário atual ao montar o componentes
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user || null);
    };
    getUser();

    // Listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Limpa o listener ao desmontar
    return () => authListener.subscription.unsubscribe();
  }, []);

  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          {!isAuthRoute && <Header user={user} setUser={setUser} />}
          {/* Main Content */}
          <main>{children}</main>
          {/* Footer */}
          {!isAuthRoute && <Footer />}
        </div>
      </body>
    </html>
  );
}

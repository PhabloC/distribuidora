"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import "@/app/globals.css"; // Importando estilos globais

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null); // Estado inicial sem usuário
  const pathname = usePathname();

  // Removido isAdminRoute e lógica do Sidebar
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

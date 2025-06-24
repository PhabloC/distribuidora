"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import "@/app/globals.css"; // Importando estilos globais

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null); // Estado inicial sem usuário (ajustável para 'admin' ou 'client')
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar user={user} setUser={setUser} />{" "}
          {/* Passa setUser para alternância */}
          {/* Main Content */}
          <div className="flex flex-1">
            {/* Sidebar (somente para admin e fora de auth routes) */}
            {isAdminRoute && user && user.role === "admin" && !isAuthRoute && (
              <Sidebar />
            )}
            {/* Conteúdo principal */}
            <main
              className={`flex-1 p-4 ${
                isAdminRoute && user && user.role === "admin" ? "ml-64" : ""
              }`}
            >
              {children}
            </main>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Simula alternância de papel
  const toggleRole = () => {
    if (!user) {
      setUser({ role: "client" }); // Inicia como cliente se não logado
    } else if (user.role === "client") {
      setUser({ role: "admin" }); // Alterna para admin
    } else {
      setUser({ role: "client" }); // Alterna para cliente
    }
  };

  // Simula logout (reseta o estado)
  const handleLogout = () => {
    setUser(null);
    router.push("/auth/login");
    setIsOpen(false);
  };

  // Determina se é admin com base no papel simulado
  const isAdmin = user && user.role === "admin";

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Distribuidora
        </Link>

        {/* Menu para dispositivos móveis */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links de navegação */}
        <div
          className={`md:flex items-center space-x-4 ${
            isOpen
              ? "block absolute top-16 left-0 right-0 bg-blue-600 p-4"
              : "hidden"
          } md:block`}
        >
          {user ? (
            <>
              {isAdmin ? (
                <>
                  <Link href="/dashboard" className="block p-2 hover:underline">
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/products"
                    className="block p-2 hover:underline"
                  >
                    Produtos
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className="block p-2 hover:underline"
                  >
                    Pedidos
                  </Link>
                  <Link
                    href="/dashboard/clients"
                    className="block p-2 hover:underline"
                  >
                    Clientes
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/shop/products"
                    className="block p-2 hover:underline"
                  >
                    Catálogo
                  </Link>
                  <Link href="/shop/cart" className="block p-2 hover:underline">
                    Carrinho
                  </Link>
                  <Link
                    href="/shop/orders"
                    className="block p-2 hover:underline"
                  >
                    Meus Pedidos
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block p-2 bg-red-500 rounded hover:bg-red-600"
              >
                Sair
              </button>
              <button
                onClick={toggleRole}
                className="block p-2 bg-yellow-500 rounded hover:bg-yellow-600"
              >
                Alternar Papel ({user.role})
              </button>
            </>
          ) : (
            <>
              <Link href="/shop/products" className="block p-2 hover:underline">
                Catálogo
              </Link>
              <Link href="/auth/login" className="block p-2 hover:underline">
                Login
              </Link>
              <Link href="/auth/register" className="block p-2 hover:underline">
                Cadastro
              </Link>
              <button
                onClick={() => setUser({ role: "client" })}
                className="block p-2 bg-green-500 rounded hover:bg-green-600"
              >
                Entrar como Cliente
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

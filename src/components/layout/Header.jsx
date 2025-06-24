"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Header({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false); // Não usado agora, mas mantido
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Simula alternância de papel
  const toggleRole = () => {
    if (!user) {
      setUser({ role: "client" });
    } else if (user.role === "client") {
      setUser({ role: "admin" });
    } else {
      setUser({ role: "client" });
    }
  };

  // Simula logout
  const handleLogout = () => {
    setUser(null);
    router.push("/auth/login");
    setIsOpen(false);
  };

  // Simula busca
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Busca por:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-[#1F2438] text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo (esquerda) */}
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2 min-w-[120px]"
        >
          <Image
            src="/logo.png"
            alt="Logo da Distribuidora"
            width={80}
            height={80}
          />
        </Link>

        {/* Barra de pesquisa (centro) */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            placeholder="Pesquisar produtos..."
            className="w-full max-w-md pl-6 p-2 rounded-3xl text-white bg-[#232946] border border-[#232946] focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-300"
          />
        </div>

        {/* Opções (direita) */}
        <div className="flex items-center gap-4 min-w-[220px] justify-end">
          {user ? (
            <>
              <button onClick={handleLogout} className="p-2 hover:underline">
                Sair
              </button>
              <Link href="/client/profile" className="p-2 hover:underline">
                <FaUserCircle className="w-6 h-6 text-gray-200 hover:text-yellow-400" />
              </Link>
              <Link
                href="/shop/cart"
                className="p-2 hover:underline flex items-center gap-1"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/shop/products" className="p-2 hover:underline">
                Produtos
              </Link>
              <Link href="/auth/login" className="p-2 hover:underline">
                Entrar/Cadastrar
              </Link>
              <Link
                href="/shop/cart"
                className="p-2 hover:underline flex items-center gap-1"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

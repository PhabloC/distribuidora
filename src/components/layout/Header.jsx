"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Header({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("User no Header:", user);
    if (typeof user === "undefined") {
      const storedUser = localStorage.getItem("user");
      console.log("Stored User:", storedUser ? JSON.parse(storedUser) : null);
      if (storedUser && setUser) {
        setUser(JSON.parse(storedUser));
      } else if (setUser) {
        setUser(null);
      }
    }
    setLoading(false);
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Busca por:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-[#1F2438] text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
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
        <div className="flex items-center gap-4 min-w-[220px] justify-end">
          {typeof user === "undefined" || loading ? null : user ? (
            <>
              <Link href="/shop/products" className="p-2 hover:underline">
                Produtos
              </Link>
              {user.role?.toLowerCase() === "admin" && (
                <Link
                  href="/shop/products/new"
                  className="p-2 hover:underline text-yellow-400 font-bold"
                  style={{ minWidth: 0 }}
                >
                  Cadastrar Produto
                </Link>
              )}
              <Link
                href="/shop/cart"
                className="p-2 hover:underline flex items-center gap-1"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 hover:text-yellow-400 focus:outline-none"
                >
                  <FaUserCircle className="w-6 h-6 text-gray-200 cursor-pointer" />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-10">
                    <Link
                      href="/client/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Editar Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
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

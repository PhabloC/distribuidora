"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 fixed">
      <h2 className="text-xl font-bold mb-4">Painel Admin</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/dashboard"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/products"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Produtos
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/orders"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Pedidos
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/clients"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Clientes
          </Link>
        </li>
      </ul>
    </aside>
  );
}

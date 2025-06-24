export default function ProductsPage() {
  // Dados simulados de produtos (agora constante)
  const products = [
    { id: 1, name: "Produto 1", description: "Descrição do Produto 1" },
    { id: 2, name: "Produto 2", description: "Descrição do Produto 2" },
    { id: 3, name: "Produto 3", description: "Descrição do Produto 3" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled
            >
              Adicionar ao Carrinho (Simulado)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

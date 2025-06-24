"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaUserCircle } from "react-icons/fa";

// Inicializa o cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Carrega os dados do perfil do usuário logado
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata.name || "");
        setEmail(user.email || "");
        setPhone(user.user_metadata.phone || "");
        setAddress(user.user_metadata.address || "");
        if (user.user_metadata.photoUrl)
          setPhotoUrl(user.user_metadata.photoUrl);
      }
    };
    fetchProfile();
  }, []);

  // Função para lidar com a mudança da foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  // Função para salvar alterações
  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let uploadedPhotoUrl = photoUrl;
    // Simulação de upload de foto (adicione lógica real se quiser salvar no Supabase Storage)
    if (photo) {
      uploadedPhotoUrl = photoUrl;
    }

    const { error } = await supabase.auth.updateUser({
      data: { name, phone, address, photoUrl: uploadedPhotoUrl },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Perfil atualizado com sucesso!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D0C0B0] py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Perfil</h1>
      <form
        className="w-full max-w-md flex flex-col gap-4 items-center"
        onSubmit={handleSave}
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <label htmlFor="photo" className="cursor-pointer">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400 shadow"
              />
            ) : (
              <span className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 border-2 border-yellow-400">
                <FaUserCircle className="w-16 h-16 text-gray-400" />
              </span>
            )}
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
          <span className="text-xs text-gray-600">
            Clique para alterar a foto
          </span>
        </div>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
          disabled // E-mail é imutável por padrão
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-2 cursor-pointer"
        >
          Salvar
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
      <p className="mt-8 text-gray-700">
        <a href="/shop/products" className="text-blue-600 hover:underline">
          Voltar para Produtos
        </a>
      </p>
    </div>
  );
}

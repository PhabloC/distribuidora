"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaUserCircle } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setName(user.user_metadata.name || "");
        setEmail(user.email || "");
        setPhone(user.user_metadata.phone || "");
        setAddress(user.user_metadata.address || "");
        setNumber(user.user_metadata.number || "");
        setPostal(user.user_metadata.postal || "");
        setCity(user.user_metadata.city || "");
        setNeighborhood(user.user_metadata.neighborhood || "");
        setComplement(user.user_metadata.complement || "");

        if (user.user_metadata.photoUrl)
          setPhotoUrl(user.user_metadata.photoUrl);
      } else {
        console.log("Usuário não autenticado durante o carregamento");
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoUrl(URL.createObjectURL(file)); // Pré-visualização local
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      setError("Falha na autenticação. Faça login novamente.");
      console.log(
        "Erro de autenticação:",
        authError || "Usuário não encontrado"
      );
      return;
    }
    console.log(
      "Usuário autenticado, ID:",
      user.id,
      "Token presente:",
      !!user.token
    );

    let uploadedPhotoUrl = photoUrl;

    // Upload da foto para o Supabase Storage
    if (photo) {
      const fileName = `${Date.now()}-${photo.name}`;
      console.log("Tentando upload para:", `public/${fileName}`);
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(`public/${fileName}`, photo, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) {
        setError(`Erro ao carregar a foto: ${uploadError.message}`);
        console.error("Erro de upload:", uploadError);
        return;
      }
      uploadedPhotoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
      console.log("Upload bem-sucedido, URL:", uploadedPhotoUrl);
    }

    // Atualiza o perfil no Supabase Auth
    const { error } = await supabase.auth.updateUser({
      data: {
        name,
        phone,
        address,
        number,
        postal,
        city,
        neighborhood,
        complement,
        photoUrl: uploadedPhotoUrl,
      },
    });

    if (error) {
      setError(`Erro ao atualizar perfil: ${error.message}`);
    } else {
      setSuccess("Perfil atualizado com sucesso!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-300 py-12">
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
          disabled
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
        <input
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
        />
        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
          />
          <input
            type="text"
            placeholder="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
          />
        </div>
        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
          />
          <input
            type="text"
            placeholder="CEP"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-2 cursor-pointer"
        >
          Salvar
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
      <p className="mt-8 text-gray-700 ">
        <a href="/shop/products" className="text-blue-600 hover:underline">
          Voltar para Produtos
        </a>
      </p>
    </div>
  );
}

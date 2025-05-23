"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita refresh da página
    console.log(codigo);

    if (codigo == "12345") {
      alert("Login Efectuado com Sucesso!")
    } else {
      alert("Verifique o código ou não existe!")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-white to-green-200">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
          {/* Lado esquerdo - imagem */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src="/images/1.jpg"
              alt="Candidatos a Exame"
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>

          {/* Lado direito - formulário */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
              Portal do Candidato
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Localize a sua sala de exame na Universidade Pedagógica
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Código do Candidato
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black "
                  placeholder="Insira o seu código"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

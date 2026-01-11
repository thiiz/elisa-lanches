'use client'

import { useState } from "react"

export default function Teste() {
  const [nome, setNome] = useState('')
  const nomedafuncao = () => {
    setNome('Clicou')
  }
    return (
        <div>
            <h1>Teste</h1>
            <button onClick={nomedafuncao} className="bg-red-500">
              Nome do botão
            </button>
            <p>{nome}</p>
        </div>
    )
}
'use client'
import { useState } from 'react'

export default function FormularioGasto() {
  // 1. Estados para capturar los datos
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState('Aseo')
  const [concepto, setConcepto] = useState('')
  const [enviando, setEnviando] = useState(false)

  // 2. Función para la hora exacta de Colombia
  const obtenerFechaColombia = () => {
    return new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    const nuevoGasto = {
      monto: Number(monto),
      categoria,
      concepto,
      fecha_hora: obtenerFechaColombia(), // ¡Aquí está el ajuste de Colombia!
      tipo: 'gasto'
    }

    console.log("Enviando a la base de datos:", nuevoGasto)
    
    // AQUÍ IRÁ TU FUNCIÓN DE SUPABASE O FETCH
    // Una vez enviado, limpiamos el formulario:
    setMonto('')
    setConcepto('')
    setEnviando(false)
    alert("Gasto registrado con hora de Colombia ✅")
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Monto ($)</label>
          <input 
            type="number" 
            required
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ej: 50000"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-lg text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white outline-none text-slate-900"
          >
            <option>Aseo</option>
            <option>Insumos</option>
            <option>Local</option>
            <option>Desechables</option>
            <option>Consignaciones</option>
            <option>Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Concepto</label>
          <textarea 
            required
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="¿En qué se gastó?"
            className="w-full p-3 rounded-xl border border-slate-300 outline-none h-24 text-slate-900"
          />
        </div>

        <button 
          type="submit"
          disabled={enviando}
          className={`w-full ${enviando ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200`}
        >
          {enviando ? 'Registrando...' : 'Registrar Gasto'}
        </button>
      </form>
    </div>
  )
}
"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"
import { Button } from "./button"

interface SalaCardProps {
  nombre: string
  personas: number
  genero: string
  artista: string
  onEntrar: () => void
}

const SalaCard: React.FC<SalaCardProps> = ({ nombre, personas, genero, artista, onEntrar }) => {
  return (
    <Card className="w-80 h-96 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border-blue-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
      {/* Ondas de fondo con SVG mejoradas */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`waveGradient-${nombre}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>

          {/* Primera onda con animación suave */}
          <path
            d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
            fill={`url(#waveGradient-${nombre})`}
            className="animate-pulse"
          />

          {/* Segunda onda */}
          <path
            d="M0,250 Q150,200 300,250 T600,250 L600,400 L0,400 Z"
            fill="rgba(255,255,255,0.3)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* Tercera onda */}
          <path
            d="M0,300 Q200,250 400,300 L400,400 L0,400 Z"
            fill="rgba(255,255,255,0.15)"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Contenido de la tarjeta */}
      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-white text-2xl font-bold group-hover:text-blue-100 transition-colors duration-200">
            {nombre}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center space-y-6">
          {/* Contador de listeners con icono */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              {/* Icono de personas */}
              <svg className="w-6 h-6 text-white/90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <p className="text-white text-3xl font-extrabold leading-tight">{personas}</p>
            </div>
            <p className="text-white/90 text-lg font-medium">Listeners</p>
          </div>

          {/* Información adicional con iconos */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              {/* Icono de música */}
              <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.622-2.26l.038-.349A2.216 2.216 0 0113.617 11H16.5V5.478L8.5 7.444v7.019a2.25 2.25 0 01-1.774 2.198l-2.041.442A2.216 2.216 0 012.063 14.843l.038-.349A2.216 2.216 0 014.117 12.5H7V4.522a.75.75 0 01.596-.735l9.125-1.688a.75.75 0 01.721.1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-white/90 text-sm font-medium">{genero}</p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              {/* Icono de micrófono */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1.75a3 3 0 013 3v6.5a3 3 0 01-6 0v-6.5a3 3 0 013-3zM19.25 10.25v1.5a7.25 7.25 0 01-14.5 0v-1.5M12 17.75v4.5"
                />
              </svg>

              <p className="text-white/90 text-sm font-medium">{artista}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button
            onClick={onEntrar}
            className="w-full bg-white hover:bg-blue-50 text-blue-600 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 text-lg border-2 border-transparent hover:border-blue-200 group-hover:bg-blue-50"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Join Room</span>
              {/* Icono de flecha */}
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </CardFooter>
      </div>

      {/* Indicador de actividad (pulso sutil) */}
      <div className="absolute top-4 right-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
      </div>
    </Card>
  )
}

export default SalaCard

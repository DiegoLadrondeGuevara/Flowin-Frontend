"use client"
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './card';
import { Button } from './button';

interface SalaCardProps {
  nombre: string;
  personas: number;
  genero: string;
  artista: string;
  onEntrar: () => void;
}

const SalaCard: React.FC<SalaCardProps> = ({ nombre, personas, genero, artista, onEntrar }) => {
  return (
    <Card className="w-80 h-96 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border-blue-400/30 shadow-xl">
      {/* Ondas de fondo con SVG */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>

          {/* Primera onda */}
          <path
            d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
            fill="url(#waveGradient)"
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

      {/* Contenido de la tarjeta */}
      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-white text-2xl font-bold">{nombre}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col justify-center space-y-4">
          <div className="text-center">
            <p className="text-white/90 text-lg font-medium">{personas} listeners</p>
          </div>

          {/* Información adicional más sutil */}
          <div className="space-y-2">
            <p className="text-white text-sm text-center">
              <span className="font-medium">Género:</span> {genero}
            </p>
            <p className="text-white text-sm text-center">
              <span className="font-medium">Artista:</span> {artista}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="pt-6">
          <Button
            onClick={onEntrar}
            className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            Join Room
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default SalaCard;

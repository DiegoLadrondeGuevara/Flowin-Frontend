import React from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';

const ErrorTestPage: React.FC = () => {
  const { navigateToError } = useErrorHandler();

  const testErrors = [
    {
      name: 'Error 403 - Forbidden',
      type: 'forbidden' as const,
      message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      statusCode: 403,
    },
    {
      name: 'Error de Conexión',
      type: 'connection' as const,
      message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
    },
    {
      name: 'Error 500 - Servidor',
      type: 'server' as const,
      message: 'Error interno del servidor. Intenta nuevamente más tarde.',
      statusCode: 500,
    },
    {
      name: 'Error 404 - No Encontrado',
      type: 'notFound' as const,
      message: 'La página que buscas no existe.',
      statusCode: 404,
    },
    {
      name: 'Error General',
      type: 'general' as const,
      message: 'Ha ocurrido un error inesperado.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Página de Prueba de Errores
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 mb-8 text-center">
            Haz clic en cualquier botón para simular diferentes tipos de errores y ver cómo se muestran:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testErrors.map((error, index) => (
              <button
                key={index}
                onClick={() => navigateToError(error.type, error.message, error.statusCode)}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {error.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {error.message}
                </p>
                {error.statusCode && (
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Código: {error.statusCode}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Instrucciones:</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Cada botón simula un tipo diferente de error</li>
              <li>• La página de error se adapta automáticamente al tipo de error</li>
              <li>• Puedes navegar de vuelta usando los botones de la página de error</li>
              <li>• Esta página es solo para desarrollo y testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorTestPage;

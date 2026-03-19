import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FlowInLogo from '../components/FlowInLogo';
import { AlertTriangle, Wifi, Lock, RefreshCw, Home, LogIn } from 'lucide-react';

interface ErrorPageProps {
  errorType?: 'forbidden' | 'connection' | 'server' | 'notFound' | 'general';
  message?: string;
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorType = 'general',
  message,
  statusCode
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener información del error desde el state de navegación si existe
  const state = location.state as {
    errorType?: string;
    message?: string;
    statusCode?: number;
  } || {};

  const finalErrorType = errorType || state.errorType || 'general';
  const finalMessage = message || state.message;
  const finalStatusCode = statusCode || state.statusCode;

  const getErrorConfig = () => {
    switch (finalErrorType) {
      case 'forbidden':
        return {
          icon: <Lock className="w-24 h-24 text-red-500" />,
          title: 'Acceso Denegado',
          subtitle: `Error ${finalStatusCode || 403}`,
          description: finalMessage || 'No tienes permisos para acceder a este recurso. Tu sesión puede haber expirado.',
          bgColor: 'from-red-100 to-red-50',
          iconBg: 'bg-red-100',
          suggestions: [
            'Verifica que hayas iniciado sesión',
            'Tu sesión puede haber expirado',
            'Contacta al administrador si el problema persiste'
          ],
          actions: [
            { label: 'Iniciar Sesión', action: () => navigate('/login'), variant: 'primary', icon: <LogIn className="w-4 h-4" /> },
            { label: 'Ir al Inicio', action: () => navigate('/'), variant: 'secondary', icon: <Home className="w-4 h-4" /> }
          ]
        };

      case 'connection':
        return {
          icon: <Wifi className="w-24 h-24 text-orange-500" />,
          title: 'Error de Conexión',
          subtitle: 'No se pudo conectar al servidor',
          description: finalMessage || 'No se pudo establecer conexión con el backend. Verifica tu conexión a internet.',
          bgColor: 'from-orange-100 to-orange-50',
          iconBg: 'bg-orange-100',
          suggestions: [
            'Verifica tu conexión a internet',
            'El servidor puede estar temporalmente fuera de servicio',
            'Intenta recargar la página'
          ],
          actions: [
            { label: 'Reintentar', action: () => window.location.reload(), variant: 'primary', icon: <RefreshCw className="w-4 h-4" /> },
            { label: 'Ir al Inicio', action: () => navigate('/auth/login'), variant: 'secondary', icon: <Home className="w-4 h-4" /> }
          ]
        };

      case 'server':
        return {
          icon: <AlertTriangle className="w-24 h-24 text-yellow-500" />,
          title: 'Error del Servidor',
          subtitle: `Error ${finalStatusCode || 500}`,
          description: finalMessage || 'El servidor está experimentando problemas técnicos.',
          bgColor: 'from-yellow-100 to-yellow-50',
          iconBg: 'bg-yellow-100',
          suggestions: [
            'El problema es temporal del servidor',
            'Intenta nuevamente en unos minutos',
            'Si persiste, contacta al soporte técnico'
          ],
          actions: [
            { label: 'Reintentar', action: () => window.location.reload(), variant: 'primary', icon: <RefreshCw className="w-4 h-4" /> },
            { label: 'Ir al Inicio', action: () => navigate('/'), variant: 'secondary', icon: <Home className="w-4 h-4" /> }
          ]
        };

      case 'notFound':
        return {
          icon: <AlertTriangle className="w-24 h-24 text-blue-500" />,
          title: 'Página No Encontrada',
          subtitle: 'Error 404',
          description: 'La página que buscas no existe o ha sido movida.',
          bgColor: 'from-blue-100 to-blue-50',
          iconBg: 'bg-blue-100',
          suggestions: [
            'Verifica que la URL sea correcta',
            'La página puede haber sido movida o eliminada',
            'Usa el menú de navegación para encontrar lo que buscas'
          ],
          actions: [
            { label: 'Ir al Inicio', action: () => navigate('/'), variant: 'primary', icon: <Home className="w-4 h-4" /> },
            { label: 'Volver Atrás', action: () => navigate(-1), variant: 'secondary' }
          ]
        };

      default:
        return {
          icon: <AlertTriangle className="w-24 h-24 text-gray-500" />,
          title: 'Oops! Algo salió mal',
          subtitle: finalStatusCode ? `Error ${finalStatusCode}` : 'Error inesperado',
          description: finalMessage || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
          bgColor: 'from-gray-100 to-gray-50',
          iconBg: 'bg-gray-100',
          suggestions: [
            'Recarga la página',
            'Verifica tu conexión a internet',
            'Contacta con el support del servidor si el problema persiste'
          ],
          actions: [
            { label: 'Reintentar', action: () => window.location.reload(), variant: 'primary', icon: <RefreshCw className="w-4 h-4" /> },
            { label: 'Ir al Inicio', action: () => navigate('/'), variant: 'secondary', icon: <Home className="w-4 h-4" /> }
          ]
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} flex items-center justify-center p-8`}>
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <FlowInLogo className="mx-auto mb-4" />
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          {/* Icon */}
          <div className={`${config.iconBg} rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8`}>
            {config.icon}
          </div>

          {/* Title and subtitle */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {config.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {config.subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {config.description}
          </p>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">Posibles soluciones:</h3>
            <ul className="space-y-2">
              {config.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {config.actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`
                  px-8 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
                  ${action.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>

          {/* Additional info */}
          {(finalStatusCode || finalMessage) && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <details className="text-left">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
                  Información técnica
                </summary>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-700">
                  {finalStatusCode && <p>Código de estado: {finalStatusCode}</p>}
                  {finalMessage && <p>Mensaje: {finalMessage}</p>}
                  <p>Timestamp: {new Date().toLocaleString()}</p>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

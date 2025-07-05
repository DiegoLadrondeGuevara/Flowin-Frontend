import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

type ErrorType = 'forbidden' | 'connection' | 'server' | 'notFound' | 'general';

interface ErrorInfo {
  type: ErrorType;
  message?: string;
  statusCode?: number;
}

export const useErrorHandler = () => {
  const navigate = useNavigate();

  const handleError = useCallback((error: unknown, customType?: ErrorType) => {
    let errorInfo: ErrorInfo;

    // ...existing code...
    if (error instanceof Error) {
      // Error de red o conexión
      if (error.message.includes('fetch') || error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        errorInfo = {
          type: customType || 'connection',
          message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        };
      }
      // Error 403 - Forbidden
      else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        errorInfo = {
          type: customType || 'forbidden',
          message: 'No tienes permisos para acceder a este recurso. Tu sesión puede haber expirado.',
          statusCode: 403,
        };
      }
      // Error 404 - Not Found
      else if (error.message.includes('404') || error.message.includes('Not Found')) {
        errorInfo = {
          type: customType || 'notFound',
          message: 'El recurso solicitado no fue encontrado.',
          statusCode: 404,
        };
      }
      // Error 500 - Server Error
      else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
        errorInfo = {
          type: customType || 'server',
          message: 'Error interno del servidor. Intenta nuevamente más tarde.',
          statusCode: 500,
        };
      }
      // Error general
      else {
        errorInfo = {
          type: customType || 'general',
          message: error.message,
        };
      }
    }
    // Error de respuesta HTTP
    else if (typeof error === 'object' && error !== null && 'status' in error) {
      const httpError = error as { status: number; message?: string };
      
      switch (httpError.status) {
        case 403:
          errorInfo = {
            type: 'forbidden',
            message: 'Acceso denegado. Tu sesión puede haber expirado.',
            statusCode: 403,
          };
          break;
        case 404:
          errorInfo = {
            type: 'notFound',
            message: 'Recurso no encontrado.',
            statusCode: 404,
          };
          break;
        case 500:
        case 502:
        case 503:
          errorInfo = {
            type: 'server',
            message: 'Error del servidor. Intenta nuevamente más tarde.',
            statusCode: httpError.status,
          };
          break;
        default:
          errorInfo = {
            type: customType || 'general',
            message: httpError.message || `Error HTTP ${httpError.status}`,
            statusCode: httpError.status,
          };
      }
    }
    // Error desconocido
    else {
      errorInfo = {
        type: customType || 'general',
        message: 'Ha ocurrido un error inesperado.',
      };
    }

    // Navegar a la página de error con la información
    navigate('/error', {
      state: {
        errorType: errorInfo.type,
        message: errorInfo.message,
        statusCode: errorInfo.statusCode,
      },
    });
  }, [navigate]);

  const handleApiError = useCallback((response: Response, customMessage?: string) => {
    const errorInfo: ErrorInfo = {
      type: response.status === 403 ? 'forbidden' : 
            response.status === 404 ? 'notFound' : 
            response.status >= 500 ? 'server' : 'general',
      message: customMessage || `Error ${response.status}: ${response.statusText}`,
      statusCode: response.status,
    };

    navigate('/error', {
      state: {
        errorType: errorInfo.type,
        message: errorInfo.message,
        statusCode: errorInfo.statusCode,
      },
    });
  }, [navigate]);

  const navigateToError = useCallback((type: ErrorType, message?: string, statusCode?: number) => {
    navigate('/error', {
      state: {
        errorType: type,
        message,
        statusCode,
      },
    });
  }, [navigate]);

  return {
    handleError,
    handleApiError,
    navigateToError,
  };
};

export default useErrorHandler;

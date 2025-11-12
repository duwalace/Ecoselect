import { useState, useEffect } from 'react';

/**
 * Custom hook to get user's geolocation
 * @returns {Object} { location, error, loading }
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      setError('Geolocalização não é suportada pelo seu navegador. Mostrando todos os centros.');
      return;
    }

    const onSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLoading(false);
      setError(null);
    };

    const onError = (err) => {
      // Tentar novamente com configurações menos rigorosas
      if (err.code === err.POSITION_UNAVAILABLE || err.code === err.TIMEOUT) {
        console.log('Tentando obter localização com configurações alternativas...');
        
        const fallbackOptions = {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 300000 // 5 minutos
        };

        navigator.geolocation.getCurrentPosition(
          onSuccess,
          (fallbackErr) => {
            setLoading(false);
            
            switch (fallbackErr.code) {
              case fallbackErr.PERMISSION_DENIED:
                setError('Acesso à localização negado. Por favor, habilite os serviços de localização para encontrar centros próximos.');
                break;
              case fallbackErr.POSITION_UNAVAILABLE:
                setError('Não foi possível determinar sua localização. Verifique se os serviços de localização estão habilitados no seu dispositivo.');
                break;
              case fallbackErr.TIMEOUT:
                setError('Tempo de requisição da localização esgotado. Verifique sua conexão com a internet.');
                break;
              default:
                setError('Não foi possível obter sua localização. Mostrando todos os centros.');
            }
          },
          fallbackOptions
        );
        return;
      }
      
      setLoading(false);
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError('Acesso à localização negado. Por favor, habilite os serviços de localização para encontrar centros próximos.');
          break;
        case err.POSITION_UNAVAILABLE:
          setError('Não foi possível determinar sua localização. Verifique se os serviços de localização estão habilitados no seu dispositivo.');
          break;
        case err.TIMEOUT:
          setError('Tempo de requisição da localização esgotado. Verifique sua conexão com a internet.');
          break;
        default:
          setError('Não foi possível obter sua localização. Mostrando todos os centros.');
      }
    };

    // Primeira tentativa com alta precisão
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return { location, error, loading };
};


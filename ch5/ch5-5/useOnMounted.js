import { useEffect } from 'react';
const useOnMounted = (effect) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useOnMounted;
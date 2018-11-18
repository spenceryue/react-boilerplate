import { useMemo } from 'react';
export default function memoized(func) {
  return props => useMemo(() => func(props), [props]);
}

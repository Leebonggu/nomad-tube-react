import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler, setValue];
}
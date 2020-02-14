import React, { useState, useEffect } from 'react';

const useModalShowState = (initialStateShow = false) => {
  const [show, setShow] = useState(initialStateShow);

  const toggleShow = () => {
    setShow(!show);
  };

  return [show, toggleShow];
};

export default useModalShowState;

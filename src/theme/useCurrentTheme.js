/**
 * Classification': '//SecureWorks/Internal Use
 * Copyright © 2020 SecureWorks, Inc. All rights reserved.
 */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import LightTheme from './Light';
import { selectActiveTheme } from '../state/slices/appSlice';
// import { selectActiveTheme } from '../state/slices/appSlice';
/**
 * Returns theme based on user preferences.
 *
 * @returns {Object} Current theme
 */
 const useCurrentTheme = () => {
  const themeValue = useSelector(selectActiveTheme);
  return useMemo(
    () => (LightTheme),
    [themeValue],
  );
};

export default useCurrentTheme;

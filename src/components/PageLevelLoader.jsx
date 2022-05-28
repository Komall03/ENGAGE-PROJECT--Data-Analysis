import React from 'react';
import { Box, Backdrop } from '@mui/material';
import Loader from '../assets/images/loader2.svg';

export default function PageLevelLoader() {
  const [showLoader, setShowLoader] = React.useState(false);
  const showLoaderHandler = () => {
    setShowLoader(true);
  };
  const hideLoaderHandler = () => {
    setShowLoader(false);
  };
  React.useEffect(() => {
    document.addEventListener('showLoader', showLoaderHandler, false);
    document.addEventListener('hideLoader', hideLoaderHandler, false);
  }, []);
  return (
    <Box>
      {showLoader ? (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} open={showLoader}>
            <Box>
              <img sx={{ width: 100, height: 100 }} src={Loader} alt="" />
            </Box>
        </Backdrop>
      ) : null}
    </Box>
  );
}

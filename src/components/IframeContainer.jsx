import {
 Box, Grid, Card, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const IframeContainer = ({ url, header }) => (
  <Grid item xs={12}>
    <Box mb={3}>
      <Typography sx={{ fontWeight: 'bold' }} variant="h6">
        {header}
      </Typography>
    </Box>
    <Card elevation={0}>
      <Box sx={{ height: (theme) => theme.spacing(80) }}>
        <embed
          id="iframe_graph"
          src={url}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Card>
  </Grid>
);
IframeContainer.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};
export default IframeContainer;

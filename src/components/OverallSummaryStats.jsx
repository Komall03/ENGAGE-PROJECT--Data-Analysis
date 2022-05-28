import React from 'react';
import {
 Grid, Typography, Button, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const textFieldStyle = (theme) => ({
  borderRadius: 1,
  '.MuiOutlinedInput-input': {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
});
const OverallSummaryStats = React.memo(
  ({
 overallSummarySubmit, autocompleteValue, taskResult, locationState,
}) => (
    <Grid item xs={12} sx={{ pt: 3 }}>
      {!locationState ? (
        <Grid container mb={2} xs={12}>
          <Typography variant="h6" gutterBottom component="div">
            Selected Dataset
          </Typography>
        </Grid>
      ) : null}
        <Grid container>
          <Grid xs={4}>
            <TextField
              sx={(theme) => textFieldStyle(theme)}
              label=""
              id="outlined-basic"
              type="text"
              fullWidth
              size="small"
              name="TunningData"
              disabled={true}
              placeholder="Select Categorical Variable"
              value={autocompleteValue?.TunningData}
            />
          </Grid>
          {!locationState ? (
          <Grid ml={6} xs={5}>
            <Button
              p={2}
              className="dash-button"
              onClick={overallSummarySubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
      ) : null}
        </Grid>
      {taskResult?.Results?.length ? (
        <Grid sx={{ marginTop: (theme) => theme.spacing(5) }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={5}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                }}
              >
                {taskResult?.Results?.map(() => (
                  <Grid
                    item
                    xs={12}
                    key={1}
                    sx={{
                      marginBottom: (theme) => theme.spacing(4),
                    }}
                  >
                    {/* <TableWithComment
                      datasetData={data?.tables?.data}
                      tableHeader={data?.tables?.header}
                    /> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  ),
);

OverallSummaryStats.propTypes = {
  overallSummarySubmit: PropTypes.func.isRequired,
  taskResult: PropTypes.oneOfType([PropTypes.object]).isRequired,
  locationState: PropTypes.oneOfType([PropTypes.object]).isRequired,
  autocompleteValue: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default OverallSummaryStats;

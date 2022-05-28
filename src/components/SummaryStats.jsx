/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  MenuItem,
  TextField,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import IframeContainer from './IframeContainer';
import boxplot from '../assets/charts/prelimnary_box.png';
import histogram from '../assets/charts/prelimnary_histogram.png';

const textFieldStyle = (theme) => ({
  borderRadius: 1,
  '.MuiOutlinedInput-input': {
    backgroundColor: theme.palette.common.white,
  },
  '.MuiInputBase-input': {
    color: theme.palette.common.black,
  },
  '.MuiInputLabel-root': {
    color: alpha(theme.palette.common.black, 0.4),
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: alpha(theme.palette.common.black, 0),
  },
  '.MuiInputLabel-shrink': {
    color: alpha(theme.palette.common.black, 0),
  },
  '&.MuiPopover-paper': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.white,
  },
});
const menuProps = () => ({
  '& .MuiPaper-root': {
    boxShadow: 0,
  },
});
const SummaryStats = React.memo(
  ({
 summaryStatsForm, columnList, taskResult,
}) => {
  console.log('he');
  return (
    <Grid>
        <Grid container xs={12} sx={{ pt: 3 }}>
          <Grid container mb={3} xs={12} mt={3} display="flex" alignItems="center">
            <Typography ml={2} variant="h6">
              Select Variable
            </Typography>
          </Grid>
          <Grid xs={4}>
            <TextField
              sx={(theme) => (textFieldStyle(theme))}
              label="Select"
              id="outlined-basic"
              type="text"
              select
              fullWidth
              size="small"
              name="TunningPara"
              placeholder="Select Continious Variable"
              onChange={(e) => {
                summaryStatsForm.handleChange(e);
}}
              value={summaryStatsForm.values.TunningPara}
              onBlur={summaryStatsForm.handleBlur}
              error={
                summaryStatsForm.touched.TunningPara
                && Boolean(summaryStatsForm.errors.TunningPara)
              }
              helperText={
                summaryStatsForm.touched.TunningPara
                && summaryStatsForm.errors.TunningPara
              }
              SelectProps={
                {
                  MenuProps: {
                    sx: menuProps,
                  },
                }
              }
            >
              {columnList
                .map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid ml={6} xs={5}>
            <Box mr={4} component="span">
              <Button
                p={2}
                variant="outlined"
                onClick={summaryStatsForm.handleReset}
              >
                Discard
              </Button>
            </Box>
            <Button
              p={2}
              className="dash-button"
              onClick={() => summaryStatsForm.handleSubmit()}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      {taskResult?.success ? (
        <Grid sx={{ marginTop: (theme) => theme.spacing(5) }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={5}
                sx={{ marginTop: (theme) => theme.spacing(1) }}
              >
                  <Grid item xs={6} key={1}>
                  <Box sx={{ height: '400px' }}>
                  <DataGrid
        rows={taskResult?.table}
        columns={[{ field: 'attribute', width: 400 }, { field: 'value' }]}
        pageSize={5}
        rowsPerPageOptions={[5]}
                  />
                  </Box>
                  </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={5}
                sx={{ marginTop: (theme) => theme.spacing(1) }}
              >
                  <Grid item xs={6} key={1}>
                    <IframeContainer
                      url={boxplot}
                      header="box plot"
                    />
                  </Grid>
                  <Grid item xs={6} key={1}>
                    <IframeContainer
                      url={histogram}
                      header="histogram"
                    />
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
},
);

SummaryStats.propTypes = {
  taskResult: PropTypes.oneOfType([PropTypes.object]).isRequired,
  summaryStatsForm: PropTypes.oneOfType([PropTypes.object]).isRequired,
  columnList: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default SummaryStats;

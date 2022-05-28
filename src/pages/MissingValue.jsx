import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import useExploratoryAnalysis from '../hooks/useExploratoryAnalysis';
import useScenario from '../hooks/useScenario';
import IframeContainer from '../components/IframeContainer';
import mv from '../assets/charts/mv.png';

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

const TabPanel = React.memo((props) => {
  const {
 children, value, index, ...other
} = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`download-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Grid>
  );
});
TabPanel.defaultProps = {
  children: null,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const MissingValue = () => {
  const {
    missingValue,
    commentCall,
  } = useExploratoryAnalysis();
  const {
    datasetList,
  } = useScenario();
  const [taskResult, setTaskResult] = useState([]);
  const [datasetListData, setDatasetListData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const missingValueForm = useFormik({
    initialValues: {
      TunningPara: '',
      oulierRange: '',
    },
    onSubmit: (values) => {
      const data = {
        dataset: values.TunningPara,
      };
      missingValue(data).then((res) => {
        enqueueSnackbar('Missing value operation successfully', {
          variant: 'success',
        });
        setTaskResult(res?.data);
      });
    },
  });
  const commentForm = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: (values) => {
      const data = {
        dataset: missingValueForm?.values?.TunningPara,
        comment: values.comment,
        id: taskResult?.success,
      };
      commentCall(data).then(() => {
        enqueueSnackbar('Comment updated successfully', {
          variant: 'success',
        });
      });
    },
  });
  useEffect(() => {
    datasetList().then((res) => {
      setDatasetListData(res.data);
    });
  }, []);
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid md={8.5} xs={12}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h4">
            Missing Value
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
      <Grid mt={7}>
        <Box sx={{ 'margin-top': '10px' }}>
        <Grid>
        <Grid container xs={12} sx={{ pt: 3 }}>
          <Grid container mb={3} xs={12} mt={3} display="flex" alignItems="center">
            <Typography ml={2} variant="h6">
              Select Variable
            </Typography>
          </Grid>
          <Grid md={4} xs={8} id="noprint">
            <Box display="flex" flexGrow={1} pr={3} gap={2} flexWrap="wrap">
              <Box display="flex" flexGrow={1}>

            <TextField
              sx={(theme) => (textFieldStyle(theme))}
              label="Select"
              id="outlined-basic"
              type="text"
              select
              fullWidth
              size="small"
              name="TunningPara"
              placeholder="Select dataset"
              onChange={(e) => {
                missingValueForm.handleChange(e);
}}
              value={missingValueForm.touched.TunningPara}
              onBlur={missingValueForm.handleBlur}
              error={
                missingValueForm.touched.TunningPara
                && Boolean(missingValueForm.errors.TunningPara)
              }
              helperText={
                missingValueForm.touched.TunningPara
                && missingValueForm.errors.TunningPara
              }
              SelectProps={
                {
                  MenuProps: {
                    sx: menuProps,
                  },
                }
              }
            >
              {datasetListData?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
            </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid ml={6} xs={3}>
            <Box mr={4} component="span">
              <Button
                p={2}
                variant="outlined"
                onClick={missingValueForm.handleReset}
              >
                Discard
              </Button>
            </Box>
            <Button
              p={2}
              className="dash-button"
              onClick={() => missingValueForm.handleSubmit()}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {console.log(taskResult)}
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
                    <IframeContainer
                      url={mv}
                      header="Bar Garph"
                    />
                  </Grid>
                  <Grid item xs={6} key={1}>
                  <Grid container>
                  <Grid xs={6} mr={2} mt={10}>
            <TextField
              sx={(theme) => (textFieldStyle(theme))}
              id="outlined-basic"
              type="text"
              fullWidth
              size="small"
              name="comment"
              placeholder="enter comments"
              onChange={(e) => {
                commentForm.handleChange(e);
}}
              value={commentForm.values.comment}
              onBlur={commentForm.handleBlur}
              error={
                commentForm.touched.comment
                && Boolean(commentForm.errors.comment)
              }
              helperText={
                commentForm.touched.comment
                && commentForm.errors.comment
              }
              SelectProps={
                {
                  MenuProps: {
                    sx: menuProps,
                  },
                }
              }
            />
                  </Grid>
          <Grid ml={6} xs={3} mt={10}>
          <Grid container>
            <Button
              p={2}
              className="dash-button"
              onClick={() => commentForm.handleSubmit()}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
          </Grid>
                  </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
        </Grid>
        </Box>
      </Grid>
      </Grid>
    </Grid>
  );
};

export default MissingValue;

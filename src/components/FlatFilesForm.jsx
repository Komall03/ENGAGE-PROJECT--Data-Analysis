import React, { useState } from 'react';
import {
 Typography, Button, Grid, Avatar, Box,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import FlatFiles from '../assets/images/FlatFiles.svg';

const FlatFilesForm = ({ uploadThersholdFile }) => {
  const { app } = useSelector((state) => state);
  const [fileData, setFileData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv,.xlsx,.txt,.json',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFileData(acceptedFiles[0]);
      if (acceptedFiles[0] === undefined) {
        enqueueSnackbar('Please upload file with correct format', {
          variant: 'warning',
        });
      }
    },
  });
  const importFile = () => {
    if (fileData) {
  const formData = new FormData();
  formData.append('File', fileData);
  formData.append('ScenarioId', app?.activeScenario?.ScenarioId);
  formData.append('ScenarioType', app?.activeScenario?.ScenarioType);
        uploadThersholdFile(formData);
        setFileData(undefined);
    } else {
      enqueueSnackbar('Please select a dataset', {
        variant: 'warning',
      });
    }
  };
  return (
    <Grid item xs={12}>
      <Box
        sx={(theme) => ({
          border: '4px dashed',
          borderColor: alpha(theme.palette.common.sapphire, 0.25),
          margin: theme.spacing(5, 0, 9, 0),
        })}
        textAlign="center"
        {...getRootProps()}
        pt={25}
      >
        <input {...getInputProps()} accept=".csv,.xlsx,.txt,.json" />
        <Box mb={8}>
          {fileData === undefined ? (
            <>
            <Typography
              style={{ cursor: 'grab' }}
              noWrap={true}
              fontWeight="fontWeightBold"
            >
                Drag & Drop
            </Typography>
            <Typography
              style={{ cursor: 'grab' }}
              noWrap={true}
            >
              your files here
            </Typography>
            </>
          ) : (
            <Typography>
              {fileData.name}
              (
              {fileData.size}
              ) Kb
            </Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" gap={3} flexGrow={1} justifyContent="flex-end">
        <Box>
          <Button variant="outlined" onClick={() => setFileData()}>Discard</Button>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => importFile()}>Submit</Button>
        </Box>
      </Box>
    </Grid>
  );
};
FlatFilesForm.propTypes = {
  startUpload: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  importForm: PropTypes.oneOfType([PropTypes.object]).isRequired,
  uploadThersholdFile: PropTypes.func.isRequired,
};
export default FlatFilesForm;

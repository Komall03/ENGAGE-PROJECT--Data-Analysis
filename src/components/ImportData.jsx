import React, { useState } from 'react';
import {
  Grid,
  Avatar,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Pages from '../assets/images/Pages.svg';
import FlatFilesForm from './FlatFilesForm';

const validationSchema = Yup.object().shape({
  dataSets: Yup.string().required('Required!'),
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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Grid>
  );
});
const ImportData = ({ startUpload, uploadThersholdFile }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const importForm = useFormik({
    initialValues: {
      dataSets: '',
    },
    validationSchema,
    onSubmit: () => { },
  });
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Grid xs={12} width="100%">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" gap={3}>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">
             Data Upload
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box mt={5}>
          <FlatFilesForm
            startUpload={startUpload}
            importForm={importForm}
            uploadThersholdFile={uploadThersholdFile}
          />
        </Box>
      </Box>
    </Grid>
  );
};

ImportData.propTypes = {
  startUpload: PropTypes.func.isRequired,
  uploadThersholdFile: PropTypes.func.isRequired,
};
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
export default ImportData;

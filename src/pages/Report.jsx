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
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import useExploratoryAnalysis from '../hooks/useExploratoryAnalysis';
import useScenario from '../hooks/useScenario';
import IframeContainer from '../components/IframeContainer';
import outlier from '../assets/charts/outlier.png';
import boxplot from '../assets/charts/prelimnary_box.png';
import histogram from '../assets/charts/prelimnary_histogram.png';
import mv from '../assets/charts/mv.png';
import bivariate from '../assets/charts/bivariate.png';

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
const validationSchema = Yup.object().shape({
    TunningPara: Yup.string().required('Required!'),
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

const Report = () => {
    const {
        outlierCall,
        commentCall,
        reportComment,
    } = useExploratoryAnalysis();
    const {
        datasetList,
        fetchDatasetColumnList,
    } = useScenario();
    const [taskResult, setTaskResult] = useState([]);
    const [datasetListData, setDatasetListData] = useState([]);
    const [autocompleteValue1, setAutocompleteValue1] = useState();
    console.log(datasetListData);
    const [columnList, setColumnList] = useState([]);
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const outlierForm = useFormik({
        initialValues: {
            TunningPara: '',
            oulierRange: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const data = {
                dataset: autocompleteValue1,
                column_name: values.TunningPara,
                threshold: values.oulierRange,
            };
            outlierCall(data).then((res) => {
                enqueueSnackbar('Outlier operation successfully', {
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
                dataset: autocompleteValue1,
                comment: values.comment,
                id: taskResult?.success,
            };
            commentCall(data).then((res) => {
                enqueueSnackbar('Comment updated successfully', {
                    variant: 'success',
                });
            });
        },
    });
    const navigate = useNavigate();
    const Redirect = () => {
        navigate(`/etl/dataoverview?datasetId=${location?.state?.Parameters?.DatasetData?.id}`);
    };

    console.log(outlierForm?.values);
    useEffect(() => {
        datasetList().then((res) => {
            setDatasetListData(res.data);
        });
    }, []);
    useEffect(() => {
        if (autocompleteValue1) {
            const data = {
                dataset: autocompleteValue1,
            };
            reportComment(data).then((res) => {
                setTaskResult(res.data);
            });
        }
    }, [autocompleteValue1]);
    console.log(taskResult);
    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid md={8.5} xs={12}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4">
                        Report
                    </Typography>
                </Grid>
                {!location?.state ? (
                    <Grid md={3.5} xs={8} id="noprint">
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
                                    placeholder="Select Continious Variable"
                                    onChange={(e) => {
                                        setAutocompleteValue1(e.target.value);
                                    }}
                                    value={autocompleteValue1}
                                    onBlur={outlierForm.handleBlur}
                                    error={
                                        outlierForm.touched.TunningPara
                                        && Boolean(outlierForm.errors.TunningPara)
                                    }
                                    helperText={
                                        outlierForm.touched.TunningPara
                                        && outlierForm.errors.TunningPara
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
                ) : (
                    <Box display="flex" justifyContent="flex-end" flexGrow={1}>
                        <Button
                            onClick={() => Redirect()}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Back
                        </Button>
                    </Box>
                )}
            </Grid>
            {taskResult?.length ? (
            <Grid
                container
                spacing={5}
                sx={{ marginTop: (theme) => theme.spacing(1) }}
            >
                <Grid item xs={6} key={1}>
                    <IframeContainer
                        url={boxplot}
                        header={taskResult[0]}
                    />
                </Grid>
                <Grid item xs={6} key={1} mt={6}>
                    <IframeContainer
                        url={histogram}
                        header={" "}
                    />
                </Grid>
                <Grid item xs={6} key={1}>
                    <IframeContainer
                        url={outlier}
                        header={taskResult[1]}
                    />
                </Grid>
                <Grid item xs={6} key={1}>
                    <IframeContainer
                        url={mv}
                        header={taskResult[2]}
                    />
                </Grid>
                <Grid item xs={6} key={1}>
                    <IframeContainer
                        url={bivariate}
                        header={taskResult[3]}
                    />
                </Grid>
            </Grid>
            ) : null}
        </Grid>
    );
};

export default Report;

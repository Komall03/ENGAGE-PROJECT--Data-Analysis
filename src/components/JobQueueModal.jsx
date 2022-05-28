import React, { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import useTaskView from '../hooks/useTaskView';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;
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
const Statuses = React.memo(
  ({
    data,
    value,
    fetchTaskResult,
    deleteTask,
    setTaskResult,
    setTaskParameters,
    close,
    updateTaskViewList,
    setActiveOperation,
    setTaskId,
    datasetList,
  }) => (
    <DialogContent
      sx={{
        padding: 0,
      }}
    >
      <Box sx={{ height: '57vh' }}>
        {data?.filter((item) => {
          let check = false;
            datasetList?.map((dataset) => {
              if (dataset?.id === item?.TuneData && dataset?.Steps === 2) {
                check = true;
              }
              return check;
            });
            if (check) {
            return null;
            }
          return item;
        })
          .sort((a, b) => (a.StartTime > b.StartTime ? -1 : 1))
          .map((item) => (item?.TaskStatus === value ? (
              <Card
                key={item.id}
                sx={{ mb: 4, mt: 4, border: 'none' }}
                variant="outlined"
              >
                <Grid>
                  <Box>
                    <Box display="flex" sx={{ m: 2 }}>
                      <Box sx={{ width: 80 }}>
                        <Typography>Job ID</Typography>
                      </Box>
                      <Box mr={2}>
                        <Typography>:</Typography>
                      </Box>
                      <Box>
                        <Typography>{item?.TaskID}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" sx={{ m: 2 }}>
                      <Box sx={{ width: 80 }}>
                        <Typography>Operation</Typography>
                      </Box>
                      <Box mr={2}>
                        <Typography>:</Typography>
                      </Box>
                      <Box>
                        <Typography>{item?.Operation}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" sx={{ m: 2 }}>
                      <Box sx={{ width: 80 }}>
                        <Typography>Dataset</Typography>
                      </Box>
                      <Box mr={2}>
                        <Typography>:</Typography>
                      </Box>
                      <Box>
                        <Typography>{item?.Parameters?.TunningData}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" sx={{ m: 2 }}>
                      <Box sx={{ width: 80 }}>
                        <Typography>Start Time</Typography>
                      </Box>
                      <Box mr={2}>
                        <Typography>:</Typography>
                      </Box>
                      <Box>
                        <Typography>{item?.CreatedOn}</Typography>
                      </Box>
                    </Box>
                    <Box display="flex" sx={{ m: 2 }}>
                      <Box sx={{ width: 80 }}>
                        <Typography>EndTime</Typography>
                      </Box>
                      <Box mr={2}>
                        <Typography>:</Typography>
                      </Box>
                      <Box>
                        <Typography>{item?.UpdatedOn}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    p={4}
                  >
                    <Button
                      className="dash-button"
                      onClick={() => {
                        deleteTask(item?.TaskID).then(() => {
                          updateTaskViewList();
                        });
                      }}
                      type="submit"
                      variant="outlined"
                    >
                      Discard
                    </Button>
                    <Box mr={4} />
                    {value === 'SUCCESS' ? (
                      <Button
                        className="dash-button"
                        onClick={() => {
                          if (
                            [
                              'Alerts',
                              'Outlier Treatment',
                              'Tunning Analysis',
                              'atlbtl',
                              'SamplingDownload',
                            ].includes(item?.Operation)
                          ) {
                            setTaskId(item?.TaskID);
                          }
                          fetchTaskResult(item?.TaskID).then((res) => {
                            setTaskResult(res?.data);
                            setTaskParameters(res?.data?.Parameters);
                            close();
                            setActiveOperation(item?.SubModule);
                          });
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        View
                      </Button>
                    ) : null}
                  </Box>
                </Grid>
              </Card>
            ) : null))}
      </Box>
    </DialogContent>
  ),
);
const JobQueueModal = ({
  open,
  close,
  data,
  setTaskResult,
  setTaskParameters,
  updateTaskViewList,
  setActiveOperation,
  setTaskId,
}) => {
  const [spin, setSpin] = useState(false);
  const { app } = useSelector((state) => state);
  const refreshTaskView = () => {
    setSpin(true);
    updateTaskViewList();
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  };
  const { fetchTaskResult, deleteTask } = useTaskView();
  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <Card
        sx={{ p: 7, backgroundColor: (theme) => theme.palette.common.grey }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Box>
            <Typography
              id="customized-dialog-title"
              onClose={close}
              variant="h5"
              fontWeight="fontWeightBold"
            >
              Job Queue
            </Typography>
          </Box>
          <Box mb={2}>
            <IconButton aria-label="close" size="large">
              <AutorenewIcon
                sx={{
                  ...(spin
                    ? { animation: `${rotate} 1s 1` }
                    : { cursor: 'pointer' }),
                }}
                onClick={refreshTaskView}
                spin={spin}
              />
            </IconButton>
            <IconButton aria-label="close" onClick={close} size="large">
              <CloseIcon size="small" />
            </IconButton>
          </Box>
        </Box>
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: (theme) => theme.palette.common.white, mb: 2, borderRadius: 1 }}
        >
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            label=""
            InputLabelProps={{ shrink: false }}
            placeholder="Search by job ID"
            autoComplete="off"
            name="searchbar"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Box>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
            selectionFollowsFocus
          >
            <Tab label={<Typography variant="inherit">Completed</Typography>} />
            <Tab label={<Typography variant="inherit">Pending</Typography>} />
            <Tab label={<Typography variant="inherit">Failed</Typography>} />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <Statuses
              data={data.filter(
                (item) => item?.TaskID.toLowerCase().indexOf(query.toLowerCase())
                  !== -1,
              )}
              value="SUCCESS"
              fetchTaskResult={fetchTaskResult}
              deleteTask={deleteTask}
              setTaskResult={setTaskResult}
              setTaskParameters={setTaskParameters}
              close={close}
              updateTaskViewList={updateTaskViewList}
              setActiveOperation={setActiveOperation}
              setTaskId={setTaskId}
              datasetList={app?.datasetList}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Statuses
              data={data.filter(
                (item) => item?.TaskID.toLowerCase().indexOf(query.toLowerCase())
                  !== -1,
              )}
              value="PENDING"
              deleteTask={deleteTask}
              updateTaskViewList={updateTaskViewList}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <Statuses
              data={data.filter(
                (item) => item?.TaskID.toLowerCase().indexOf(query.toLowerCase())
                  !== -1,
              )}
              value="FAILED"
              deleteTask={deleteTask}
              updateTaskViewList={updateTaskViewList}
            />
          </TabPanel>
        </Box>
      </Card>
    </Dialog>
  );
};

JobQueueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setTaskResult: PropTypes.func.isRequired,
  setTaskParameters: PropTypes.func.isRequired,
  setTaskId: PropTypes.func.isRequired,
  updateTaskViewList: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
Statuses.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  datasetList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  value: PropTypes.number.isRequired,
  fetchTaskResult: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setTaskResult: PropTypes.func.isRequired,
  setTaskParameters: PropTypes.func.isRequired,
  updateTaskViewList: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  setTaskId: PropTypes.func.isRequired,
};
export default JobQueueModal;

import axios from 'axios';

const useExploratoryAnalysis = () => {
  const summaryStatsCall = (data) => axios
  .post('http://127.0.0.1:8000/univariate', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
    const outlierCall = (data) => axios
  .post('http://127.0.0.1:8000/outlier', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
    const bivariateCall = (data) => axios
  .post('http://127.0.0.1:8000/bivariate', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
    const missingValue = (data) => axios
  .post('http://127.0.0.1:8000/mv', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
    const commentCall = (data) => axios
  .post('http://127.0.0.1:8000/comment', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
    const reportComment = (data) => axios
  .post('http://127.0.0.1:8000/generate', data).then(
      (res) => res,
      (err) => {
        throw err;
      },
    );
  return {
    summaryStatsCall,
    outlierCall,
    missingValue,
    bivariateCall,
    commentCall,
    reportComment,
  };
};
export default useExploratoryAnalysis;

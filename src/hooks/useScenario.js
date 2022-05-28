import axios from 'axios';

const useScenario = () => {
    const datasetList = () => axios
    .get('http://127.0.0.1:8000/dataset')
    .then(
      (res) => res,
      (err) => { throw err; },
    );

  const fetchDatasetColumnList = (data) => axios
    .get('http://127.0.0.1:8000/columns', {
      params: data,
    })
    .then(
      (res) => res,
      (err) => { throw err; },
    );

  return {
    datasetList,
    fetchDatasetColumnList,
  };
};
export default useScenario;

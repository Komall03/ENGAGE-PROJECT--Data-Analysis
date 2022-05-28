import axios from 'axios';

const useDataIngestion = () => {
  const uploadThersholdFile = (fileDetails) => axios
      .post(
        'http://127.0.0.1:8000/upload',
        fileDetails,
      )
      .then(
        (res) => res,
        (err) => {
          throw err;
        },
      );

  return {
    uploadThersholdFile,
  };
};
export default useDataIngestion;

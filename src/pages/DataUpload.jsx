import * as React from 'react';
import ImportData from '../components/ImportData';
import useDataIngestion from '../hooks/useDataIngestion';

export default function DataUpload() {
  const {
    startUpload,
    uploadThersholdFile,
  } = useDataIngestion();
  return (
          <ImportData
            startUpload={startUpload}
            uploadThersholdFile={uploadThersholdFile}
          />
  );
}

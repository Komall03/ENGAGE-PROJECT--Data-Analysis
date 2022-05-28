export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL,
  //  ---------------------AUTH------------------------------ //
  AUTH: {
    LOGIN: '/auth/login/',
    REFRESH_TOKEN: '/auth/token/refresh',
    RESET_PASSWORD: '/auth/reset-password/',
  },
  SCENARIO: {
    LIST: '/data/scenario',
    CREATE_SCENARIO: '/data/scenario',
  },
  DATASET: {
    LIST: '/data/allsets',
    DATA: '/data/',
    THRESHOLD_DATA: '/data/threshold/',
    COLUMN_DETAIL: '/data/column_details',
  },
  DATA_OVERVIEW: {
    TUNABLE_PARAMETER: '/data/tuneparameter',
    AUDIT_TRAIL: '/data/audit',
    CLONE_DATASET: '/data/clone/',
  },
  DATA_INGESTION: {
    UPLOAD_S3: '/data/uploads3',
    UPLOAD_SIGNED: '/data/uploadsigned',
    UPLOAD_COMPLETED: '/data/uploadcomplete',
    DELETE_SCENARIO: '/data/scenario',
    EDIT_SCENARIO: '/data/scenario',
    UPLOAD_THRESHOLD_FILE: '/data/import_data',
    DELETE_DATASET: '/data/',
    DELETE_THRESHOLD: '/data/threshold/',
    CODE_VALIDATION: '/data/scenario/query_code',
  },
  TASK: {
    LIST: '/data/tasks',
    VIEW: '/data/tasks/',
    DELETE: '/data/tasks/',
  },
  EDA: {
    TYPE: '/preliminary/column/type',
    SUMMARY_STAT: '/preliminary/summary_stats',
    OVERALL_STAT: '/preliminary/summary_stats/overall',
  },
  OUTLIER_ANALYSIS: {
    OUTLIER_CALL: '/outlier/analysis',
  },
  TUNING_DATA_ANALYSIS: {
    TDA_CALL: '/tunning/analysis',
    FREEZE: '/tunning/freeze',
  },
  SAMPLING: {
    FINAL_TUNABLE: '/data/tunned/',
    ATL_BTL: '/sampling/atlbtl/',
    FREEZE_BTL: '/sampling/freezebtl',
  },
  SAMPLE_GENERATION: {
    FREEZED_SAMPLE: '/sampling/getfreeze/',
    GENERATED_SAMPLE: '/sampling/sample/',
  },
  IMPACT_ANALYSIS: {
    FINAL_TUNABLE: '/data/tunned/',
    IMPACT_ANALYSIS: '/impact/impact_analysis',
    IMPACT_TABLE: '/impact/',
    IMPACT_FREEZE: '/impact/impact_analysis',
  },
};
export default API_ENDPOINTS;

import axios from 'axios';
export default axios.create({
    // baseURL: 'https://angry-.62-151-180-40.plesk.page/openApi',
    baseURL: 'https://api.aiharness.io/',


    responseType: "json",
    // timeout: 20000,
    timeoutErrorMessage:'Server Timeout'
  });

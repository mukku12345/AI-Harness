import axios from 'axios';
export default axios.create({
    baseURL: 'https://angry-darwin.62-151-180-40.plesk.page/openApi',
    responseType: "json",
    // timeout: 20000,
    timeoutErrorMessage:'Server Timeout'
  });

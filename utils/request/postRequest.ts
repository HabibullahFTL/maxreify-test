import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

const postRequest = (
  url: string,
  body: any,
  headers: object = {},
  params: object = {}
) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axiosInstance
      .post(url, body, { headers, params })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err?.response);
      });
  });
};

export default postRequest;

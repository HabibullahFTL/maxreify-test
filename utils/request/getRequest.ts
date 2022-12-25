import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

const getRequest = (
  url: string,
  headers: object,
  params: object = {},
) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axiosInstance
      .get(url, { headers, params })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err?.response);
      });
  });
};

export default getRequest;

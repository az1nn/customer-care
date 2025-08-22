import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

export interface ConfigRequestProps {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

const useAxios = <T>(configRequest: ConfigRequestProps) => {
  const [dataResponse, setDataResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const { axiosInstance, method, url, params = {} } = configRequest;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response: AxiosResponse<T> = await axiosInstance.request({
        method,
        url,
        params: method === 'get' ? params : undefined,
        data: method !== 'get' ? params : undefined,
      });
      setDataResponse(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError('An unknown error occurred');
      }
      if (error instanceof AxiosError) {
        setDataResponse(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [axiosInstance, method, url, params]);

  return { dataResponse, isLoading, isError, fetchData };
};

export default useAxios;

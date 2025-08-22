import { IExample } from './IExample';

interface IBaseResponse {
  statusCode: number;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface IGetResponse extends IBaseResponse {
  data: IExample;
}

export type IPutResponse = IBaseResponse;

export interface IListResponse extends IBaseResponse {
  data: IDataResponse;
}

export interface IDataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  max_pages: number;
  current_page: number;
  results: IExample[];
}

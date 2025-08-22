// AppRoute.ts
import { RouteObject } from 'react-router-dom';

export interface IAppRoute extends Omit<RouteObject, 'children'> {
  label?: string;
  children?: IAppRoute[];
}

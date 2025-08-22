import React from 'react';
import { useRoutes } from 'react-router-dom';
import { RoutesConfig } from './RoutesConfig';

const RoutesComponent: React.FC = () => {
  const routing = useRoutes(RoutesConfig);
  return routing;
};

export default RoutesComponent;

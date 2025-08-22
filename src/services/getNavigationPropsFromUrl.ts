import { RoutesConfig } from '../routes/RoutesConfig';
import { NavigationProps } from '../stores/navigationStore';
import { IAppRoute } from '../models/IAppRoute';

const getNavigationPropsFromUrl = (): NavigationProps => {
  const currentUrl = window.location.pathname;

  const findRouteChain = (
    routes: IAppRoute[],
    target: string,
    basePath: string = ''
  ): IAppRoute[] | null => {
    for (const route of routes) {
      const fullPath = route.path?.startsWith('/')
        ? route.path
        : `${basePath}/${route.path}`.replace('//', '/');
      if (fullPath === target) {
        return [route];
      }
      if (target.startsWith(fullPath) && route.children) {
        const childChain = findRouteChain(route.children, target, fullPath);
        if (childChain) {
          return [route, ...childChain];
        }
      }
    }
    return null;
  };

  const chain = findRouteChain(RoutesConfig, currentUrl, '');

  if (chain) {
    const breadcrumb: NavigationProps[] = [];
    let cumulativePath = '';
    for (const route of chain) {
      cumulativePath = route.path?.startsWith('/')
        ? route.path
        : `${cumulativePath}/${route.path}`.replace('//', '/');
      breadcrumb.push({ page: route.label || '', url: cumulativePath });
    }
    return {
      page: chain[chain.length - 1].label || '',
      url: currentUrl,
      navbarUrl: currentUrl.split('/').slice(0, 3).join('/'),
      breadcrumb,
    };
  }

  const segments = currentUrl.split('/').filter(Boolean);
  let cumulativePath = '';
  const breadcrumb = segments.map((segment) => {
    cumulativePath += `/${segment}`;
    return {
      page: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: cumulativePath,
    };
  });
  return {
    page: breadcrumb[breadcrumb.length - 1]?.page || '',
    url: currentUrl,
    navbarUrl: currentUrl.split('/').slice(0, 3).join('/'),
    breadcrumb,
  };
};

export default getNavigationPropsFromUrl;

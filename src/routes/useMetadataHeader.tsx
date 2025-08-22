// No host, em algum componente ou hook
import { useLocation } from 'react-router-dom';

import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
// import { LoadableMfesConstant } from '../constants/LoadableMfesConstants';
import { RoutesConfig } from './RoutesConfig';
import { SidebarConfigs } from '../configs/SidebarConfigs';
import {
  updateBreadcrumbWithModules,
  findLastBreadcrumbItemWithChildren,
  findModuleByLocation,
  findTitleFromSidebar,
  findTitleFromSidebarByBreadcrumb,
} from '../components/Header/utils';

export type RouteConfig = {
  path: string;
  component?: React.ComponentType<any>;
  children?: RouteConfig[];
  label?: string;
  [key: string]: any;
};

/*
  This hook is used to get the modules from the routes config and the breadcrumb from the navigation props.
  It also updates the breadcrumb with the modules labels.
  It is used in the Header component.
*/
// export const useRemoteRouteModulesImports = () => {
//   const [modules, setModules] = useState<RouteConfig[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const loadedRef = useRef(false);
//   const modulesCache = useRef<RouteConfig[]>([]);

//   const loadAllRouteConfigs = useCallback(async () => {
//     // Avoid loading if already loaded or currently loading
//     if (loadedRef.current || isLoading) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const allRoutes: RouteConfig[] = [...RoutesConfig];

//       // Use Promise.all instead of Promise.allSettled for better performance when all are expected to succeed
//       const modulePromises = Object.values(LoadableMfesConstant).map(
//         async (module) => {
//           try {
//             const mod = await module.routesConfig;
//             return mod.default.RoutesConfig;
//           } catch (error) {
//             console.warn('Failed to load route config for module:', error);
//             return [];
//           }
//         }
//       );

//       const remoteRoutesArrays = await Promise.all(modulePromises);

//       // Flatten and add all remote routes
//       remoteRoutesArrays.forEach((remoteRoutes) => {
//         if (Array.isArray(remoteRoutes)) {
//           allRoutes.push(...remoteRoutes);
//         }
//       });

//       // Cache the result
//       modulesCache.current = allRoutes;
//       setModules(allRoutes);
//       loadedRef.current = true;
//     } catch (error) {
//       console.error('Error loading route configs:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []); // Remove location dependency to avoid reloading on every navigation

//   useEffect(() => {
//     // Only load once
//     if (!loadedRef.current && !isLoading) {
//       loadAllRouteConfigs();
//     }
//   }, [loadAllRouteConfigs]);

//   return modules;
// };

/*
  This hook is used to get the title and breadcrumb from the navigation props.
  It uses SidebarConfigs for title determination and route modules for breadcrumb functionality.
  It is used in the Header component.
*/
export const useMetadataHeader = (navigationProps: any) => {
  // const modules = useRemoteRouteModulesImports();
  const location = useLocation();
  const [title, setTitle] = useState(navigationProps.page);
  const [breadcrumb, setBreadcrumb] = useState(navigationProps.breadcrumb);

  const computedMetadata = useMemo(() => {
    // Compute breadcrumb from route modules
    let computedBreadcrumb = navigationProps.breadcrumb;
    // if (modules.length > 0 && navigationProps.breadcrumb?.length > 0) {
    //   computedBreadcrumb = updateBreadcrumbWithModules(
    //     navigationProps.breadcrumb,
    //     modules
    //   );
    // }

    // Compute title from sidebar first, then fallback to modules
    let computedTitle = navigationProps.page;

    // Try sidebar title first
    const sidebarTitle =
      navigationProps.breadcrumb?.length > 0
        ? findTitleFromSidebarByBreadcrumb(
            navigationProps.breadcrumb,
            SidebarConfigs
          )
        : findTitleFromSidebar(SidebarConfigs, location.pathname);

    if (sidebarTitle) {
      computedTitle = sidebarTitle;
    }
    // } else if (modules.length > 0) {
    //   // Fallback to modules
    //   if (navigationProps.breadcrumb?.length > 0) {
    //     const moduleTitle = findLastBreadcrumbItemWithChildren(
    //       navigationProps.breadcrumb,
    //       modules
    //     );
    //     if (moduleTitle) {
    //       computedTitle = moduleTitle;
    //     } else {
    //       const currentModule = findModuleByLocation(
    //         modules,
    //         location.pathname
    //       );
    //       if (currentModule?.label) {
    //         computedTitle = currentModule.label;
    //       }
    //     }
    //   } else {
    //     const currentModule = findModuleByLocation(modules, location.pathname);
    //     if (currentModule?.label) {
    //       computedTitle = currentModule.label;
    //     }
    //   }
    // }

    return { title: computedTitle, breadcrumb: computedBreadcrumb };
  }, [
    // modules,
    location.pathname,
    navigationProps.breadcrumb,
    navigationProps.page,
  ]);

  useEffect(() => {
    setTitle(computedMetadata.title);
    setBreadcrumb(computedMetadata.breadcrumb);
  }, [computedMetadata]);

  return { title, breadcrumb };
};

import { RouteConfig } from '../../routes/useMetadataHeader';
import { SidebarMenuProps } from '../Sidebar/interfaces/SidebarProps';

// Generic item type that can represent either route or sidebar items
type GenericItem = {
  path?: string;
  url?: string;
  children?: GenericItem[];
  label?: string;
  page?: string;
  [key: string]: unknown;
};

/*
  Generic helper function to get the path/url from an item
*/
const getItemPath = (item: GenericItem): string => {
  return item.path || item.url || '';
};

/*
  Generic helper function to get the label/page from an item
*/
const getItemLabel = (item: GenericItem): string | undefined => {
  return item.label || item.page;
};

/*
  Generic helper function to check if a path segment matches a target segment.
  This includes handling dynamic parameters like ":id"
*/
const isSegmentMatch = (itemPath: string, targetSegment: string): boolean => {
  // Clean the item path
  const cleanItemPath = itemPath.replace(/^\/+|\/+$|\*+$/g, '');

  // Check for exact matches first
  if (
    cleanItemPath === targetSegment ||
    itemPath === `/${targetSegment}` ||
    itemPath === `${targetSegment}/*` ||
    itemPath === `/${targetSegment}/*`
  ) {
    return true;
  }

  // Check for dynamic parameter match (e.g., ":id" matches any value)
  if (cleanItemPath.startsWith(':')) {
    return true;
  }

  // Handle multi-segment paths like "editar-empresa/:id"
  // Check if the item path starts with the target segment
  const itemSegments = cleanItemPath.split('/').filter(Boolean);
  if (itemSegments.length > 1 && itemSegments[0] === targetSegment) {
    return true;
  }

  return false;
};

/*
  Generic helper function to check if a path contains dynamic parameters
*/
const hasDynamicParameters = (itemPath: string): boolean => {
  const pathSegments = itemPath.split('/').filter(Boolean);
  return pathSegments.some((segment) => segment.startsWith(':'));
};

/*
  Generic helper function to check if an item path matches a target path, including dynamic parameters
*/
const isPathMatch = (itemPath: string, targetPath: string): boolean => {
  const itemSegments = itemPath
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  const targetSegments = targetPath
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);

  if (itemSegments.length !== targetSegments.length) {
    return false;
  }

  for (let i = 0; i < itemSegments.length; i++) {
    const itemSegment = itemSegments[i];
    const targetSegment = targetSegments[i];

    // If item segment is a dynamic parameter, it matches any target segment
    if (itemSegment.startsWith(':')) {
      continue;
    }

    // Otherwise, segments must match exactly
    if (itemSegment !== targetSegment) {
      return false;
    }
  }

  return true;
};

/*
  Generic function to find exact path matches in flat structures
*/
const findExactMatch = (
  items: GenericItem[],
  targetPath: string
): GenericItem | null => {
  const searchInItems = (itemList: GenericItem[]): GenericItem | null => {
    for (const item of itemList) {
      const itemPath = getItemPath(item);
      // Clean paths for comparison
      const cleanItemPath = itemPath.replace(/^\/+|\/+$/g, '');
      const cleanTargetPath = targetPath.replace(/^\/+|\/+$/g, '');

      // Check for exact matches
      if (
        cleanItemPath === cleanTargetPath ||
        itemPath === targetPath ||
        itemPath === `/${cleanTargetPath}` ||
        cleanItemPath === targetPath.replace(/^\/+/, '')
      ) {
        return item;
      }

      // Check for dynamic parameter matches
      if (isPathMatch(itemPath, targetPath)) {
        return item;
      }

      // Recursively search in children
      if (item.children && item.children.length > 0) {
        const found = searchInItems(item.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return searchInItems(items);
};

/*
  Generic function to find item by path (including hierarchical traversal)
*/
const findItemByPath = (
  items: GenericItem[],
  targetPath: string
): GenericItem | null => {
  // Clean target path by removing leading/trailing slashes
  const cleanTargetPath = targetPath.replace(/^\/+|\/+$/g, '');

  // First, try to find an exact match in the flat items list
  const exactMatch = findExactMatch(items, targetPath);
  if (exactMatch) {
    return exactMatch;
  }

  // If no exact match, try hierarchical traversal
  const pathSegments = cleanTargetPath.split('/').filter(Boolean);

  // Helper function to traverse the tree following the path segments
  const traversePath = (
    currentItems: GenericItem[],
    segments: string[],
    segmentIndex: number
  ): GenericItem | null => {
    if (segmentIndex >= segments.length) {
      return null;
    }

    const currentSegment = segments[segmentIndex];

    for (const item of currentItems) {
      const itemPath = getItemPath(item);
      // Check if this item matches the current segment (including dynamic parameters)
      if (isSegmentMatch(itemPath, currentSegment)) {
        // If this is the last segment, return this item
        if (segmentIndex === segments.length - 1) {
          return item;
        }

        // If there are more segments and this item has children, continue traversing
        if (item.children && item.children.length > 0) {
          const found = traversePath(item.children, segments, segmentIndex + 1);
          if (found) {
            return found;
          }
        }
      }
    }

    return null;
  };

  // Start traversing from the root items
  return traversePath(items, pathSegments, 0);
};

/*
  Generic function to find item by matching the end of the target path, useful for fallback matching
*/
const findItemByPartialPath = (
  items: GenericItem[],
  targetSegment: string
): GenericItem | null => {
  const searchInItems = (itemList: GenericItem[]): GenericItem | null => {
    for (const item of itemList) {
      const itemPath = getItemPath(item);
      const cleanItemPath = itemPath.replace(/^\/+|\/+$|\*+$/g, '');
      const itemSegments = cleanItemPath.split('/').filter(Boolean);

      // Check if the first segment of the item path matches the target segment
      if (itemSegments[0] === targetSegment) {
        return item;
      }

      // Recursively search in children
      if (item.children && item.children.length > 0) {
        const found = searchInItems(item.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return searchInItems(items);
};

/*
  Generic function to find item by the current location pathname
*/
const findItemByLocation = (
  items: GenericItem[],
  locationPath: string
): GenericItem | null => {
  const searchInItems = (itemList: GenericItem[]): GenericItem | null => {
    for (const item of itemList) {
      const itemPath = getItemPath(item);
      // Clean paths for comparison
      const cleanItemPath = itemPath.replace(/^\/+|\/+$/g, '');
      const cleanLocationPath = locationPath.replace(/^\/+|\/+$/g, '');

      // Check for exact matches
      if (
        cleanItemPath === cleanLocationPath ||
        itemPath === locationPath ||
        itemPath === `/${cleanLocationPath}`
      ) {
        return item;
      }

      // Check for dynamic parameter matches
      const itemSegments = cleanItemPath.split('/').filter(Boolean);
      const locationSegments = cleanLocationPath.split('/').filter(Boolean);

      if (itemSegments.length === locationSegments.length) {
        let isMatch = true;
        for (let i = 0; i < itemSegments.length; i++) {
          const itemSegment = itemSegments[i];
          const locationSegment = locationSegments[i];

          // If item segment is a dynamic parameter, it matches any location segment
          if (itemSegment.startsWith(':')) {
            continue;
          }

          // Otherwise, segments must match exactly
          if (itemSegment !== locationSegment) {
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          return item;
        }
      }

      // Recursively search in children
      if (item.children && item.children.length > 0) {
        const found = searchInItems(item.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return searchInItems(items);
};

// === ROUTE MODULE SPECIFIC FUNCTIONS ===

/*
  Route module specific wrapper functions that maintain the original API
*/
const findModuleByPath = (
  modules: RouteConfig[],
  targetPath: string
): RouteConfig | null => {
  return findItemByPath(
    modules as GenericItem[],
    targetPath
  ) as RouteConfig | null;
};

const findModuleByPartialPath = (
  modules: RouteConfig[],
  targetSegment: string
): RouteConfig | null => {
  return findItemByPartialPath(
    modules as GenericItem[],
    targetSegment
  ) as RouteConfig | null;
};

/*
  This function finds the last breadcrumb item that has children in the modules.
  This item will be used as the title.
  Items with dynamic parameters are excluded from being used as titles.
*/
type BreadcrumbItem = { url?: string; page?: string; [key: string]: unknown };

export const findLastBreadcrumbItemWithChildren = (
  breadcrumbItems: BreadcrumbItem[],
  modules: RouteConfig[]
): string | null => {
  // Iterate through breadcrumb items from last to first
  for (let i = breadcrumbItems.length - 1; i >= 0; i--) {
    const item = breadcrumbItems[i];
    if (item.url) {
      const matchedModule = findModuleByPath(modules, item.url);

      // Check if this module has children and doesn't have dynamic parameters
      if (
        matchedModule &&
        matchedModule.children &&
        matchedModule.children.length > 0 &&
        !hasDynamicParameters(getItemPath(matchedModule))
      ) {
        return getItemLabel(matchedModule) || item.page;
      }
    }
  }

  return null;
};

/*
  This function is used to update the breadcrumb with the modules labels.
  It is used in the useMetadataHeader hook.
  If a module has no label, the breadcrumb will stop at that point.
  If a module has dynamic parameters (like ":id"), the breadcrumb will also stop at that point.
*/
export const updateBreadcrumbWithModules = (
  breadcrumbItems: BreadcrumbItem[],
  modules: RouteConfig[]
) => {
  const updatedBreadcrumb: BreadcrumbItem[] = [];

  for (let i = 0; i < breadcrumbItems.length; i++) {
    const item = breadcrumbItems[i];

    if (item.url) {
      // Try to find the module by the full URL path
      const matchedModule = findModuleByPath(modules, item.url);

      if (matchedModule) {
        const modulePath = getItemPath(matchedModule);
        const moduleLabel = getItemLabel(matchedModule);

        // Check if the module has dynamic parameters - if so, add it to breadcrumb then stop
        if (hasDynamicParameters(modulePath)) {
          if (moduleLabel) {
            // Module has dynamic parameters but also has a label, add it to breadcrumb
            updatedBreadcrumb.push({
              ...item,
              page: moduleLabel,
            });
          }
          break;
        }

        if (moduleLabel) {
          // Module has a label, add it to breadcrumb
          updatedBreadcrumb.push({
            ...item,
            page: moduleLabel,
          });
        } else {
          break;
        }
      } else {
        // Fallback: try to match by the last segment of the path
        const pathSegments = item.url.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        if (lastSegment) {
          const fallbackModule = findModuleByPartialPath(modules, lastSegment);

          if (fallbackModule) {
            const fallbackPath = getItemPath(fallbackModule);
            const fallbackLabel = getItemLabel(fallbackModule);

            // Check if the fallback module has dynamic parameters - if so, add it to breadcrumb then stop
            if (hasDynamicParameters(fallbackPath)) {
              if (fallbackLabel) {
                // Fallback module has dynamic parameters but also has a label, add it to breadcrumb
                updatedBreadcrumb.push({
                  ...item,
                  page: fallbackLabel,
                });
              }
              break;
            }

            if (fallbackLabel) {
              updatedBreadcrumb.push({
                ...item,
                page: fallbackLabel,
              });
            } else {
              break;
            }
          }
        } else {
          // No last segment, keep original item
          updatedBreadcrumb.push(item);
        }
      }
    } else {
      // No URL, keep original item
      updatedBreadcrumb.push(item);
    }
  }

  return updatedBreadcrumb;
};

/*
  Helper function to find a module by the current location pathname
*/
export const findModuleByLocation = (
  modules: RouteConfig[],
  locationPath: string
): RouteConfig | null => {
  return findItemByLocation(
    modules as GenericItem[],
    locationPath
  ) as RouteConfig | null;
};

// === SIDEBAR SPECIFIC FUNCTIONS ===

/*
  PUBLIC FUNCTION: Find title from SidebarConfigs based on current location
  This function is used to determine the page title from sidebar configuration
*/
export const findTitleFromSidebar = (
  sidebarItems: SidebarMenuProps[],
  locationPath: string
): string | null => {
  const matchedItem = findItemByLocation(
    sidebarItems as GenericItem[],
    locationPath
  );

  if (matchedItem && getItemLabel(matchedItem)) {
    return getItemLabel(matchedItem)!;
  }

  return null;
};

/*
  PUBLIC FUNCTION: Find title from SidebarConfigs based on breadcrumb
  This function looks through breadcrumb items to find a matching sidebar item
*/
export const findTitleFromSidebarByBreadcrumb = (
  breadcrumbItems: BreadcrumbItem[],
  sidebarItems: SidebarMenuProps[]
): string | null => {
  // Iterate through breadcrumb items from last to first to find the most specific match
  for (let i = breadcrumbItems.length - 1; i >= 0; i--) {
    const item = breadcrumbItems[i];
    if (item.url) {
      const matchedItem = findItemByPath(
        sidebarItems as GenericItem[],
        item.url
      );

      if (matchedItem && getItemLabel(matchedItem)) {
        return getItemLabel(matchedItem)!;
      }
    }
  }

  return null;
};

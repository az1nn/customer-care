import type React from 'react';

export interface SidebarMenuProps {
  icon: React.ReactNode;
  page: string;
  url: string;
  component?: React.LazyExoticComponent<React.FC<unknown>>;
  children?: Omit<SidebarMenuProps, 'icon'>[];
  hasPage?: boolean;
}
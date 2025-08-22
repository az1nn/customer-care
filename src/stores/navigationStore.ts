import { create } from "zustand";
import getNavigationPropsFromUrl from "../services/getNavigationPropsFromUrl";

export interface NavigationProps {
  page: string;
  url?: string;
  navbarUrl?: string;
  target?: string;
  props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  breadcrumb?: NavigationProps[];
}

interface NavigationActions {
  setNavigation: (data: NavigationProps) => void;
  updateNavigation: () => void;
}

export interface NavigationState extends NavigationActions {
  navigationProps: NavigationProps;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  navigationProps: getNavigationPropsFromUrl(),
  setNavigation: (data) => set({ navigationProps: data }),
  updateNavigation: () =>
    setTimeout(() => set({ navigationProps: getNavigationPropsFromUrl() }), 0),
}));

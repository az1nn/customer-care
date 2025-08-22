export interface Tab {
  index: number;
  title: string;
  tabUrl: string;
}

export interface NavbarProps {
  page?: string;
  url?: string;
  data?: Tab[];
}

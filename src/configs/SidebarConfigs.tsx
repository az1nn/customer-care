import { SidebarMenuProps } from "../components/Sidebar/interfaces/SidebarProps";

export const SidebarConfigs: SidebarMenuProps[] = [
  // {
  //   url: "/inicio",
  //   page: "Início",
  //   icon: <span className="mdn-Icon-casa mdn-Icon--md"></span>,
  // },
  {
    url: "chamados",
    page: "Chamados",
    hasPage: true,
    icon: (
      <span className="mdn-Icon-cupom mdn-Icon--md" aria-label="cupom"></span>
    ),
  },
  {
    url: "servicos",
    page: "Serviços",
    hasPage: true,
    icon: (
      <span
        className="mdn-Icon-dinheiro-cifrao-circulo mdn-Icon--md"
        aria-label="dinheiro-cifrao-circulo"
      ></span>
    ),
  },
];

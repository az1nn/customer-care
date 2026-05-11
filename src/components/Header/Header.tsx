import React from "react";
import { NavigationProps } from "../../stores/navigationStore";
import "./Header.scss";
import { Text, Breadcrumb } from "@/components/ui";
import Navbar from "./Navbar/Navbar";
import { NavbarMenuProps } from "./Navbar/Models/NavbarProps";
import { useMetadataHeader } from "../../routes/useMetadataHeader";
interface HeaderProps {
  navigationProps: NavigationProps;
  navbarConfig: NavbarMenuProps[];
}

const Header: React.FC<HeaderProps> = ({ navigationProps, navbarConfig }) => {
  const currentNavbarConfig = navbarConfig.find(
    (config) => config.url === navigationProps?.navbarUrl
  );
  const title = navigationProps.page;
  const { title: titleRemote, breadcrumb } = useMetadataHeader(navigationProps);
  return (
    <>
      <header>
        <div className="header-content">
          {navigationProps?.page && (
            <Text body bold xl>
              {titleRemote || title}
            </Text>
          )}
          {navigationProps?.breadcrumb &&
            navigationProps.breadcrumb.length > 1 && (
              <Breadcrumb data={breadcrumb} />
            )}
        </div>
      </header>
      {currentNavbarConfig?.children && (
        <>
          <Navbar navbarProps={currentNavbarConfig.children} />
        </>
      )}
    </>
  );
};

export default Header;

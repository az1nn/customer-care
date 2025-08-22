import styles from "./App.module.scss";
import React, { useEffect } from "react";
import RoutesComponent from "./routes/RoutesComponent";
import { AlertProvider } from "light-portal-components";
import Sidebar from "./components/Sidebar/Sidebar";
import mainLogo from "./assets/claro-empresas.svg";
import { SidebarConfigs } from "./configs/SidebarConfigs";
import Header from "./components/Header/Header";
import { useNavigationStore } from "./stores/navigationStore";
import { navbarConfig } from "./configs/NavbarConfigs";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const { navigationProps, updateNavigation } = useNavigationStore();
  const location = useLocation();

  useEffect(() => {
    updateNavigation();
  }, [location]);

  return (
    <AlertProvider>
      <main className={styles.App} data-location={location.pathname}>
        <Sidebar menuItems={SidebarConfigs} logoUrl={mainLogo} />
        <main className={styles.content}>
          <Header
            navigationProps={navigationProps}
            navbarConfig={navbarConfig}
          />
          <RoutesComponent />
        </main>
      </main>
    </AlertProvider>
  );
};

export default App;

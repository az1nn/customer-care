import { NavLink } from 'react-router-dom';
import './Navbar.scss'; // Importando o arquivo .scss
import { useNavigationStore } from '../../../stores/navigationStore';
import { Text } from 'mondrian-react';
import { NavbarMenuProps } from './Models/NavbarProps';

interface NavbarProps {
  navbarProps: NavbarMenuProps[]; // Recebe a configuração da navbar com suas páginas e filhos
}

const Navbar: React.FC<NavbarProps> = ({ navbarProps }) => {
  const { updateNavigation } = useNavigationStore();

  // Não renderiza nada se o navbarProps estiver vazio
  if (!navbarProps || navbarProps.length === 0) {
    return null;
  }

  const renderNavLinks = (items: NavbarMenuProps[]) => {
    return items.map((item, index) => {
      return (
        <div key={index} className="tabContainer">
          <NavLink
            to={item.url}
            onClick={() => updateNavigation()}
            className={({ isActive }) => (isActive ? 'tab activeTab' : 'tab')}
          >
            <Text body bold sm>
              {item.page}
            </Text>
          </NavLink>
        </div>
      );
    });
  };

  return <nav className="navbar">{renderNavLinks(navbarProps)}</nav>;
};

export default Navbar;

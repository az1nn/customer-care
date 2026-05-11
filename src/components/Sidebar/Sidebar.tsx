import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { Divider, Text } from '@/components/ui';
import { SidebarMenuProps } from './interfaces/SidebarProps';
import { useNavigationStore } from '../../stores/navigationStore';

interface SidebarProps {
  menuItems: SidebarMenuProps[];
  logoUrl: string;
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, logoUrl, children }) => {
  const { updateNavigation } = useNavigationStore();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const buildSubPath = (itemRoute: string, subRoute: string): string =>
    `${itemRoute}${subRoute}`;

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleExpand = useCallback((key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const onClickItem = useCallback(
    (
      item: SidebarMenuProps,
      itemKey: string,
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      setCollapsed(false);
      if (item.children) {
        toggleExpand(itemKey);
        updateNavigation();
        if (!item.hasPage) {
          e.preventDefault();
        }
      }
    },
    [toggleExpand, updateNavigation]
  );

  const toggleIconClassName = `Sidebar__toggle ${collapsed ? 'Sidebar__toggle--rotated' : ''}`;

  return (
    <div className="layout-container">
      <aside className={`Sidebar ${collapsed ? 'Sidebar--collapsed' : ''}`}>
        <header className="Sidebar__header">
          {!collapsed && (
            <img
              className="Sidebar__logo"
              src={logoUrl}
              alt="Logo"
            />
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className={`${toggleIconClassName} mdn-Icon--md ${collapsed ? 'mdn-Icon-direita' : 'mdn-Icon-esquerda'}`}
          />
        </header>
        <Divider />
        <nav className="Sidebar__nav">
          {menuItems.map((item) => {
            const itemKey = item.url;
            const isExpanded = expandedItems[itemKey];

            return (
              <div key={itemKey} className="Sidebar__itemContainer">
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `Sidebar__navItem ${isActive ? 'Sidebar__navItem--active' : ''}`
                  }
                  onClick={(e) => onClickItem(item, itemKey, e)}
                >
                  {({ isActive }) => (
                    <>
                      <div className="Sidebar__navItemIcon">{item.icon}</div>
                      {!collapsed && (
                        <Text
                          className="Sidebar__navItemLabel"
                          body
                          md
                          inverse={isActive}
                        >
                          {item.page}
                        </Text>
                      )}
                      {!collapsed && item.children && (
                        <div
                          className={`Sidebar__expandIcon ${isExpanded ? 'Sidebar__expandIcon--rotated' : ''}`}
                        >
                          <span
                            className="mdn-Icon-baixo mdn-Icon--md"
                            aria-label={
                              isExpanded ? 'Fechar submenu' : 'Abrir submenu'
                            }
                          ></span>
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
                {item.children && (
                  <div
                    className={`Sidebar__submenu ${isExpanded && !collapsed ? 'Sidebar__submenu--open' : ''}`}
                  >
                    {item.children.map((subitem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={buildSubPath(item.url, subitem.url)}
                        onClick={() => updateNavigation()}
                        className={({ isActive }) =>
                          `Sidebar__submenuItem ${isActive ? 'Sidebar__submenuItem--active' : ''}`
                        }
                      >
                        <Text body sm>
                          {subitem.page}
                        </Text>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <main style={{ marginLeft: collapsed ? '75px' : '260px', width: '100%' }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;

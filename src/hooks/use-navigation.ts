import { useMatch, useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const isInHostApp = useMatch(
    `${import.meta.env.VITE_REMOTE_BASE_MODULE_PATH}/*`
  );

  const getBasePath = () => {
    return isInHostApp ? import.meta.env.VITE_REMOTE_BASE_MODULE_PATH : '';
  };

  return {
    navigateToEdit: (id: string) => navigate(`${getBasePath()}/editar/${id}`),
    navigateToNew: () => navigate(`${getBasePath()}/criar`),
    navigateToList: () => navigate(`${getBasePath()}/listar`),
  };
};

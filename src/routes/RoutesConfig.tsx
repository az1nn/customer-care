import { Navigate } from "react-router-dom";
import { APP_ROUTES_CONSTANTS } from "../constants/AppRoutesConstants";
import { IAppRoute } from "../models/IAppRoute";
import Chamados from "../pages/Chamados/Chamados";
import Servicos from "@/pages/Financeiro/Financeiro";

export const RoutesConfig = [
  {
    path: APP_ROUTES_CONSTANTS.ROOT,
    element: <Navigate to={APP_ROUTES_CONSTANTS.CHAMADOS} replace />,
    label: "Página Inicial",
  },
  {
    path: APP_ROUTES_CONSTANTS.CHAMADOS,
    element: <Chamados />,
    label: "Cadastrar",
  },
  {
    path: APP_ROUTES_CONSTANTS.SERVICOS,
    element: <Servicos />,
    label: "Financeiro",
  },
  {
    path: APP_ROUTES_CONSTANTS.UNAUTHORIZED,
    element: <div>Não Autorizado</div>,
    label: "Não Autorizado",
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTES_CONSTANTS.CHAMADOS} replace />,
  },
] satisfies IAppRoute[];

import { Button } from "light-portal-components";
import React, { useState, useCallback, useEffect } from "react";
import { API_ENDPOINTS } from "@/constants/ApiEndpointsConstants.ts";
import defaultInstance from "@/helpers/axios-instance.ts";
import {
  IAxiosWithPermissionProps,
  useAlert,
  useAxiosWithPermission,
} from "light-portal-components";
import { useNavigation } from "@/hooks/use-navigation.ts";
import { IFormData } from "@/models/IFormData";
import AppForm from "@/pages/components/Form/Form.tsx";
import styles from "./Chamados.module.scss";
import { IPutResponse } from "@/models/IResponse";

const Chamados: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    text_field_1: "",
    text_field_2: "",
  });

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { navigateToList } = useNavigation();
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const configRequest: IAxiosWithPermissionProps = {
    axiosInstance: defaultInstance,
    method: "post",
    data: formData,
    url: API_ENDPOINTS.EXAMPLE,
    // permissionCheck: {
    //   /* Essa permissão deve ser o mesmo que virá do BFF /permissions/{userId} */
    //   permissionType: "see",
    //   /* Esse projeto deve ser o mesmo que virá do BFF /permissions/{userId} */
    //   project: "template_front",
    // },
    mock: true,
  };

  const { dataResponse, isLoading, fetchData, isError } =
    useAxiosWithPermission<IPutResponse>(configRequest);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        /* O POST é feito aqui porém o castle mock não permitirá */
        await fetchData();
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        showErrorAlert("Erro ao processar a requisição");
      }
    },
    [formData, fetchData]
  );

  useEffect(() => {
    if (isError) {
      showErrorAlert("Erro ao processar a requisição", 5000);
    }
  }, [isError]);

  useEffect(() => {
    if (dataResponse) {
      console.log("dataResponse", dataResponse);
      if (dataResponse.statusCode === 201) {
        showSuccessAlert("Dados enviados com sucesso!");
        setShouldNavigate(true);
      } else if (dataResponse.statusCode !== 201) {
        console.log("dataResponse", dataResponse);
        showErrorAlert(dataResponse.message || "Erro ao enviar dados");
      }
    }
  }, [dataResponse, showSuccessAlert, showErrorAlert]);

  useEffect(() => {
    if (shouldNavigate) {
      const timer = setTimeout(() => {
        navigateToList();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldNavigate, navigateToList]);

  return <main className={styles["main-page"]}>chamados</main>;
};

export default Chamados;

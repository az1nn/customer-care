/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAlert } from "light-portal-components";
import { API_ENDPOINTS } from "../../constants/ApiEndpointsConstants.ts";
import defaultInstance from "../../helpers/axios-instance.ts";
import { useNavigation } from "../../hooks/use-navigation.ts";
import { IFormData } from "../../models/IFormData.ts";
import { IGetResponse, IPutResponse } from "../../models/IResponse.ts";
import styles from "./Financeiro.module.scss";

import {
  IAxiosWithPermissionProps,
  useAxiosWithPermission,
  useAxios,
} from "light-portal-components";
import { Method } from "axios";

const Servicos: React.FC = () => {
  const { navigateToList } = useNavigation();
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const [formData, setFormData] = useState<IFormData>({
    text_field_1: "",
    text_field_2: "",
  });

  const clearFormData = () => {
    setFormData({
      text_field_1: "",
      text_field_2: "",
    });
  };

  const configRequestGet: IAxiosWithPermissionProps = useMemo(
    () => ({
      axiosInstance: defaultInstance,
      method: "get",
      url: API_ENDPOINTS.EXAMPLE,
      permissionCheck: {
        permissionType: "edit",
        project: "template_front",
      },
      mock: true,
    }),
    []
  );

  const {
    dataResponse: dataResponseGet,
    isLoading: isLoadingGet,
    fetchData: fetchDataGet,
    // hasScreenPermission,
  } = useAxiosWithPermission<IGetResponse>(configRequestGet);

  useEffect(() => {
    // if (hasScreenPermission) {
    if (true) {
      fetchDataGet();
    }
  }, []);

  useEffect(() => {
    if (dataResponseGet?.data) {
      setFormData({
        text_field_1: "",
        text_field_2: "",
      });
    }
  }, [dataResponseGet]);

  const configRequestPut = useMemo(
    () => ({
      axiosInstance: defaultInstance,
      method: "put" as Method,
      url: API_ENDPOINTS.EXAMPLE,
      mock: true,
      data: formData,
    }),
    [formData]
  );

  const {
    dataResponse: dataResponsePut,
    isLoading: isLoadingPut,
    fetchData: fetchDataPut,
  } = useAxios<IPutResponse>(configRequestPut);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        await fetchDataPut();
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        showErrorAlert("Erro ao processar a requisição");
      }
    },
    [fetchDataPut, formData]
  );

  useEffect(() => {
    if (dataResponsePut?.statusCode === 200) {
      showSuccessAlert("Dados atualizados com sucesso!");
      const timer = setTimeout(() => {
        navigateToList();
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (dataResponsePut?.statusCode && dataResponsePut?.statusCode !== 200) {
      showErrorAlert(dataResponsePut?.message || "Erro ao atualizar dados");
    }
  }, [dataResponsePut]);

  return (
    <main className={styles["main-page"]}>
      servicos page
    </main>
  );
};

export default Servicos;

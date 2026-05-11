import React from "react";
import { IFormData } from "@/models/IFormData";
import { Input as InputMondrian } from "mondrian-react";
import styles from "./Form.module.scss";
import { AccessControl, Input, Text } from "@/components/light-portal-compat";

interface AppFormProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  createOrUpdate: "get" | "put" | "post";
}

const AppForm: React.FC<AppFormProps> = ({
  formData,
  setFormData,
  createOrUpdate = "post",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <main className={styles["input-container"]}>
        <Text body lg>
          Dados de exemplo
        </Text>
        <section className={styles["second-line"]}>
          <Input
            permissionId={
              createOrUpdate === "post"
                ? "input_create_template_field_name"
                : "input_edit_template_field_name"
            }
            maxLength={30}
            text
            required
            name="text_field_1"
            value={formData.text_field_1}
            onChange={handleChange}
          >
            Campo exemplo 1
          </Input>
          {/* Qualquer componente pode ser renderizado dentro do AccessControl */}
          {/* O AccessControl é um componente que verifica se o usuário tem permissão para ver o componente */}
          {/* É necessário passar o permissionId para o AccessControl que virá do BFF /permissions/{userId} */}
          <AccessControl
            permissionId={
              createOrUpdate === "post"
                ? "input_create_template_field_access"
                : "input_edit_template_field_access"
            }
          >
            <InputMondrian
              maxLength={30}
              text
              required
              name="text_field_2"
              value={formData.text_field_2}
              onChange={handleChange}
            >
              Input de fora do AccessControl
            </InputMondrian>
          </AccessControl>
        </section>
      </main>
    </>
  );
};

export default AppForm;

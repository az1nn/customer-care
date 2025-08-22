import Button from './Button';

export default {
  title: 'Components/Button', // Definindo a categoria no Storybook
  component: Button, // O componente que estamos documentando
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};

export const Default = () => (
  <Button label="Botão habilitado" onClick={() => alert('Botão clicado!')} />
);
export const Disabled = () => (
  <Button
    label="Botão desabilitado"
    onClick={() => {
      /* */
    }}
    disabled
  />
);

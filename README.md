# Customer Care

Este projeto é um microfrontend (MFE) desenvolvido para o sistema Customer Care, utilizando React, TypeScript, Vite e Module Federation.

## Índice

- [1. Inicialização](#inicialização)
- [2. Visão Geral](#visão-geral)
- [3. Estrutura de Pastas](#estrutura-de-pastas)
- [4. Biome](#biome)
- [5. Lefthooks](#lefthooks)
- [6. Conventional Commits](#conventional-commits)
- [7. Storybook](#storybook)
- [8. Testes Unitários com Jest](#testes-unitários-com-jest)
- [9. Arquitetura com Vite e Module Federation](#arquitetura-com-vite-e-module-federation)

## Inicialização

Para iniciar o projeto, é importante que seu ambiente de desenvolvimento esteja devidamente configurado. Certifique-se que tenha os devidos acessos à VPN para a instalação de dependências. Caso precise configurar, acesse a [documentação de configuração de ambiente](docs/configuracaoDeAmbiente.md).

1. Após configurar o ambiente, realize o clone do projeto e vá até a pasta principal:

```sh
git clone https://gitlab.globalhitss.com.br/light-portal/customer-care.git
cd customer-care/
```

2. Instale as dependências contidas no [package.json](package.json):

```sh
pnpm install
```

**Em caso de erro:**
Caso a instalação não seja concluída com sucesso, é possível que a configuração de VPN e Nexus para o download do Mondrian não esteja correta. Defina os acessos corretamente, e faça a limpeza de cache do pnpm utilizando o comando `pnpm cache delete`.

3. Para iniciar sua aplicação, execute:

```sh
pnpm dev
```

A aplicação estará disponível em `http://localhost:5178/`.

Caso precise rodar a aplicação completa, deve-se baixar os MFEs host-app, login-app e home-app, pois são os containers iniciais da aplicação.

Para gerar os estáticos de cada MFE:

```sh
pnpm build
```

E para servir esses estáticos:

```sh
pnpm preview
```

Caso queira executar os 2 scripts em sequência:

```sh
pnpm start
```

---

## Visão Geral

O **customer-care** é um microfrontend configurado para o sistema de atendimento ao cliente. Ele inclui:

- PNPM como gerenciador de pacotes
- Biome para linting e formatação de código
- Husky/Lefthook para automação de hooks do Git
- Conventional Commits para manter o histórico organizado
- Storybook para documentação e desenvolvimento isolado de componentes
- Jest para testes unitários
- Vite como bundler e servidor de desenvolvimento, com Module Federation

---

## Estrutura de Pastas

A estrutura de diretórios é a seguinte:

```
customer-care/
├── .husky/
├── .storybook/
├── docs/
├── public/
├── src/
│   ├── app/
│   ├── App.module.scss
│   ├── App.tsx
│   ├── index.scss
│   ├── main.tsx
│   └── vite-env.d.ts
├── .babelrc
├── .env
├── .gitignore
├── .lefthook.yaml
├── .npmrc
├── babel.config.cjs
├── biome.json
├── commitlint.config.js
├── index.html
├── jest.config.cjs
├── jest.setup.js
├── Makefile
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Para uma explicação mais detalhada de cada arquivo e pasta, acesse a [documentação de estrutura do projeto](docs/estruturaDoProjeto.md).

---

## Biome

O Biome é uma ferramenta moderna que combina linting e formatação de código em uma única solução. Ele oferece:

- Verificação de qualidade de código
- Formatação automática
- Análise de código estático
- Correção automática de problemas

**Como executar:**

- Para rodar o lint e formatar o código:
```sh
pnpm biome check --write
```

- Para apenas verificar problemas sem aplicar correções:
```sh
pnpm biome check
```

**Configuração no VS Code:**

1. Instale a extensão do BiomeJS no VS Code
2. Configure o BiomeJS como formatador padrão no [settings.json](vscode://settings/):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": true
  }
}
```

---

## Lefthooks

Utilizando [.lefthook.yaml](.lefthook.yaml) é onde se configura hooks do Git para executar scripts como lint, formatação e testes antes de commits.

Este recurso impede que o usuário faça commits contendo problemas que impedirão o Deploy, como falha no Lint ou em testes do Jest.

---

## Conventional Commits

O projeto segue o padrão de [Conventional Commits](https://www.conventionalcommits.org/) para manter um histórico de commits organizado.

Exemplos:
- `feat: adiciona novo componente de header`
- `fix: corrige bug no formulário de login`
- `chore: atualiza dependências`
- `docs: atualiza README`

---

## Storybook

O Storybook permite o desenvolvimento e a documentação de componentes de forma isolada.

**Para utilizá-lo:**

1. Rode o Storybook:
```sh
pnpm storybook
```

2. Gere a versão estática:
```sh
pnpm build-storybook
```

---

## Testes Unitários com Jest

Utilizamos o Jest para garantir a confiabilidade do código através de testes unitários.

**Para rodar os testes:**

- Teste único:
```sh
pnpm test
```

- Modo observação (watch):
```sh
pnpm test -- --watch
```

---

## Arquitetura com Vite e Module Federation

Este projeto utiliza o Vite para o build e desenvolvimento, em conjunto com o plugin [@originjs/vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) para habilitar o Module Federation.

**Configuração no [vite.config.ts](vite.config.ts):**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'customerCareApp',
      filename: 'remoteEntry.js',
      exposes: {
        './CustomerCareApp': './src/CustomerCareApp',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
});
```

**Explicação:**
- **Module Federation:** Permite que partes da aplicação sejam carregadas dinamicamente de outros microfrontends
- **Configuração do Federation:**
  - `name`: Nome da aplicação
  - `filename`: Nome do arquivo de entrada (remoteEntry.js)
  - `exposes`: Define os módulos expostos para consumo por outros MFEs
  - `shared`: Lista de dependências compartilhadas

**Microfrontends (MFEs):**
- **host-app:** Aplicação principal que hospeda outros MFEs
- **home-app:** MFE responsável pela tela inicial
- **login-app:** MFE responsável pela tela de login
- **customer-care:** MFE para atendimento ao cliente

---

## Variáveis de Ambiente

Configure as variáveis de ambiente no arquivo [.env](.env) conforme descrito na [documentação de configuração de ambiente](docs/configuracaoDeAmbiente.md).

Exemplo de estrutura:

```env
VITE_REMOTE_HOME = "http://localhost:5177/assets/remoteEntry.js"
VITE_REMOTE_LOGIN = "http://localhost:5173/assets/remoteEntry.js"
VITE_REMOTE_TEMPLATE = "http://localhost:5178/assets/remoteEntry.js"
VITE_REMOTE_EMPRESAS = "http://localhost:5179/assets/remoteEntry.js"
VITE_REMOTE_LOGO_URL = "https://mondrian.claro.com.br/brands/vertical/default/claro-empresas.svg"
```

---

## Documentação Adicional

- [Configuração de Ambiente](docs/configuracaoDeAmbiente.md)
- [Estrutura do Projeto](docs/estruturaDoProjeto.md)
- [Referências da Documentação](docs/referenciasDaDocumentacao.md)

---

Com essas diretrizes, você tem todas as informações necessárias para configurar, desenvolver e manter o **customer-care** de forma
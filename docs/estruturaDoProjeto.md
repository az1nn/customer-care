```
.
├── .husky/
├── .storybook/
├── coverage/
├── dist/
├── docs/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── helpers/
│   ├── mocks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .babelrc
├── .env.development
├── .env.production
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── commitlint.config.js
├── eslint.config.js
├── index.html
├── jest.config.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── storybook/
├── tsconfig.app.json
├── tsconfig.json
└── vite.config.ts
```

### Explicações resumidas

- **.husky/**  
  Armazena scripts e configurações para o Husky, que gerencia hooks do Git (por exemplo, para rodar testes antes de commits).

- **.storybook/**  
  Contém configurações do Storybook (arquivos de setup, temas e ajustes para documentar componentes).

- **coverage/**  
  Pasta gerada automaticamente pelas ferramentas de teste (como Jest) com relatórios de cobertura de código.

- **dist/**  
  Onde o projeto é compilado e “empacotado” para produção (saída final do build).

- **docs/**  
  Pode armazenar documentação extra do projeto, guias de uso, diagramas etc.

- **node_modules/**  
  Diretório gerado automaticamente pelo gerenciador de pacotes com todas as dependências instaladas.

- **public/**  
  Arquivos estáticos que podem ser acessados diretamente (imagens, ícones, manifest.json etc.). Também costuma conter o favicon.ico.

- **src/**  
  Pasta principal do código-fonte da aplicação.

  - **assets/**  
    Recursos estáticos da aplicação (imagens, fontes, SVGs etc.).
  - **components/**  
    Componentes React reutilizáveis e organizados por funcionalidade ou propósito.
  - **context/**  
    Implementações do Context API do React (gerenciamento de estado global).
  - **helpers/**  
    Funções auxiliares e utilitárias que podem ser reutilizadas em várias partes do projeto.
  - **mocks/**  
    Dados fictícios ou configurações de mock para uso em testes ou desenvolvimento local.
  - **pages/**  
    Páginas ou views completas da aplicação (geralmente ligadas às rotas).
  - **routes/**  
    Configuração das rotas do React Router (ou outra biblioteca de roteamento).
  - **services/**  
    Serviços de acesso a APIs externas ou de integração com recursos do backend.
  - **utils/**  
    Funções genéricas ou helpers que não se encaixam em outra categoria.
  - **App.css**  
    Estilos globais ou específicos do componente raiz App.
  - **App.tsx**  
    Componente raiz da aplicação React.
  - **index.css**  
    Estilos globais básicos aplicados a toda a aplicação.
  - **main.tsx**  
    Ponto de entrada do React (onde é chamado o createRoot ou ReactDOM.render).
  - **vite-env.d.ts**  
    Declarações de tipos para recursos específicos do Vite (ex.: importação de arquivos .svg).

- **.babelrc**  
  Configurações do Babel, caso o projeto use alguma conversão adicional de código.

- **.env.development**  
  Variáveis de ambiente específicas para desenvolvimento.

- **.env.production**  
  Variáveis de ambiente específicas para produção.

- **.gitignore**  
  Lista de arquivos/pastas que o Git deve ignorar (ex.: node_modules, arquivos de log, builds etc.).

- **.npmrc**  
  Configurações do NPM (ou PNPM/Yarn), como repositórios privados, cache etc.

- **.prettierignore**  
  Arquivos ou pastas que o Prettier deve ignorar ao formatar.

- **.prettierrc**  
  Configurações de formatação do Prettier (aspas, ponto-e-vírgula, indentação etc.).

- **commitlint.config.js**  
  Configurações do Commitlint, para padronizar mensagens de commit.

- **eslint.config.js**  
  Configurações do ESLint para padronização e qualidade de código.

- **index.html**  
  Arquivo HTML principal, ponto de entrada para carregar o app React (injetado pelo Vite durante o build).

- **jest.config.js**  
  Configurações do Jest (ferramenta de testes unitários).

- **package.json**  
  Lista de dependências, scripts de execução e metadados do projeto.

- **pnpm-lock.yaml**  
  Arquivo de lock do PNPM (congela as versões exatas das dependências instaladas).

- **README.md**  
  Documentação principal do projeto (instruções de uso, instalação, contribuição etc.).

- **storybook/**  
  Pasta adicional caso você opte por separar a configuração do Storybook em vez de usar .storybook/.

- **tsconfig.app.json**  
  Configurações específicas do TypeScript para a aplicação (geralmente estendido pelo tsconfig.json).

- **tsconfig.json**  
  Configurações gerais do TypeScript (diretórios a serem compilados, opções de strict mode etc.).

- **vite.config.ts**  
  Configurações do Vite (plugins, proxies, build etc.).

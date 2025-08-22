# Configuração de Ambiente de Desenvolvimento

Este documento fornece as instruções necessárias para configurar o ambiente de desenvolvimento. Siga os passos abaixo para instalar as ferramentas necessárias e configurar o ambiente corretamente.

## Pré-requisitos

### Ferramentas e configurações necessárias:

- [1. Node.js, npm e pnpm](#1-instalação-do-nodejs-e-npm-e-pnpm)
- [2. Configurar o NPM registry](#2-configurar-o-npm-registry)
- [3. Configuração de VPN](#3-configuração-de-vpn)
- [4. Git](#4-git)
- [5. Variáveis de ambiente](#5-configuração-de-variáveis)

### Sistema operacional

- Linux (Ubuntu / Debian)
- MacOS

<span style="color:slategrey">Caso utilize Windows, é recomendado o uso de WSL2, utilizando a distribuição do Ubuntu 18 ou 20. Basta abrir o terminal Power Shell e executar `wsl --install` que o windows já preparará seu ambiente com Ubuntu 20. Finalizando, basta abrir um novo terminal Ubuntu e realizar as configurações abaixo.</span>

## 1. Instalação do Node.js e NPM e PNPM

### Características

**Node.js**

O Node.js é um pacote módulos e bibliotecas JavaScript utilizado para adicionar várias funcionalidades a aplicativos ou scripts. Como o Angular é uma das ferramentas contidas, é necessário que ele esteja instalado.

Atualmente, recomenda-se utilizar a versão 20x do node.js e 10x do npm e pnpm.

**NPM**

Já o NPM (Node Package Manager) é um gerenciador de pacotes para o Node.JS. Ele é importante para que possamos fazer as instalações do Angular CLI.

**PNPM**

O pnpm (Performant Node Package Manager) é um gerenciador de pacotes para Node.js que é uma alternativa ao npm e ao yarn. O pnpm é mais rápido, eficiente e confiável.

Como o projeto utiliza o gerenciado PNPM, deve-se fazer uma preparação com o mesmo.

**Características do pnpm**

- Armazena todos os pacotes em um armazenamento global
- Usa links físicos para que outros projetos possam usar os pacotes
- Instala pacotes rapidamente
- Ocupa menos espaço em disco
- Resolve problemas inerentes ao npm

**Como funciona o pnpm**

- Um pacote é instalado uma vez no armazenamento global
- Todos os projetos podem acessá-lo por meio de hard links
- As fases de resolução, busca e vinculação são executadas independentemente para cada pacote

### Instalando o node e o npm

1. Abra o terminal e execute o comando apropriado para sua distribuição:

   ```sh
   sudo apt update
   sudo apt upgrade
   ```

2. Instale o Node.js a partir do NodeSource:

   ```sh
   curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. Verifique a instalação:

   ```sh
   node -v
   npm -v
   ```

### Instalando o pnpm

Este projeto utiliza **exclusivamente o PNPM** como gerenciador de pacotes. O uso de outros gerenciadores (como npm ou yarn) não é permitido e pode ser bloqueado.

1.  Instale o PNPM:

    ```sh
    npm install -g pnpm
    ```

2.  Verifique a instalação:

    ```sh
    pnpm -v
    ```

## 2. Configurar o NPM Registry

Para acessar o Nexus da aplicação, é necessário que o registro do NPM aponte para o local onde estarão armazenados os pacotes privados (como o Mondrian, por exemplo). Com isso, é necessário adicionar a seguinte configuração:

```sh
npm set registry http://10.230.43.182:8081/repository/npm-group/
```

Depos é só logar e adicionar suas credenciais:

```sh
npm login
```

## 3. Configuração de VPN

Para acessar o Nexus e todos os recursos da aplicação, é necessário que seja configurado uma VPN.

Peça os devidos acessos ao suporte, onde irão passar as instruções de como baixar Client e configurar o acesso.

**IMPORTANTE: Sem a configuração da VPN, não será possível instalar todas as dependências do projeto, e as requisições irão falahar.**

## 4. Git

Git é um sistema de controle de versão distribuído. Você pode instalar o Git seguindo as instruções abaixo:

### Instalação

1. Abra o terminal e execute o comando apropriado para sua distribuição:

   ```sh
   sudo apt-get update
   sudo apt-get install git
   ```

2. Configure seu nome de usuário e endereço de e-mail no Git. Isso é importante para que suas contribuições sejam identificadas corretamente nos commits. Substitua com seu nome e seu email:

   ```sh
   git config --global user.name "Seu Nome"
   git config --global user.email "seu_email@globalhitss.com.br"
   ```

### Desativar verificação SSL

O projeto está hospedado no GitLab e o clone deve ser feito via HTTPS. Para evitar problemas com certificados SSL, desative a verificação:

```sh
git config --global http.sslVerify false
```

## 5. Configuração de variáveis de ambiente

Agora, com a aplicação em mãos, deve-se adicionar as variáveis de ambiente que serão utilizadas para acessar URLs, estáticos, entre outras informações.

Inicialmente, na raiz da aplicação, crie um arquivo chamado `.env.development`. Este arquivo devine as variáveis e o modo de execução (ambiente) que o VITE utilizará para a aplicação.

A estrutura inicial é:

```ts
VITE_REMOTE_HOME = "http://localhost:5177/assets/remoteEntry.js";
VITE_REMOTE_LOGIN = "http://localhost:5173/assets/remoteEntry.js";
VITE_REMOTE_TEMPLATE = "http://localhost:5178/assets/remoteEntry.js";
VITE_REMOTE_EMPRESAS = "http://localhost:5179/assets/remoteEntry.js";

VITE_REMOTE_LOGO_URL =
  "https://mondrian.claro.com.br/brands/vertical/default/claro-empresas.svg";
```

Configure de acordo com seu ambiente.

## Conclusão

Com as etapas executadas de acordo com o seu sistema operacional, você pode executar os `Primeiros passos` da documentação inicial.

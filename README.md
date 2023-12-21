# UserAuthProject

https://github.com/rotsteindaniel/UserAuthProject/assets/97666187/92b4e5fb-bf8e-41ac-89ab-04f794166b10

## Descrição do Projeto

O UserAuthProject é um projeto que implementa um sistema CRUD (Create, Read, Update, Delete) para usuários, com funcionalidades de listar, editar, visualizar perfil e excluir. Além disso, o projeto utiliza autenticação JWT (JSON Web Token) para garantir a segurança das operações, com os tokens armazenados nos cookies.

O backend do projeto segue a estrutura do modelo RentX da Rocketseat, utilizando o framework Express. A autenticação JWT é gerenciada no arquivo `auth`, sem um arquivo `.env` para configuração. Isso foi feito para poder praticar, sem ser um projeto real, então as variáveis sensíveis estão expostas no arquivo `auth`.

Os dados são salvos em memória, então os dados somem se reiniciar o servidor (Backend).

O frontend utiliza o framework Next.js, facilitando a construção de aplicações React. O gerenciamento de estado é realizado através do React Hook Form, garantindo um controle eficiente e intuitivo dos formulários. O Zod é utilizado para validação de dados, garantindo a integridade das informações recebidas.

## Tecnologias Utilizadas

### Backend

- Express
- JWT (JSON Web Token)
- TypeScript
- Clean Code
- UseCases
- Repository Pattern
- tsyringe

### Frontend

- Next.js
- React Hook Form
- Zod
- Axios
- TypeScript
- Custom Hooks
- AuthContext

## Estrutura do Projeto

O projeto está dividido em duas partes: o backend e o frontend.

### Backend

A estrutura do backend segue o modelo RentX da Rocketseat, utilizando Express para a construção da API. O código é organizado em camadas, como UseCases, Repository Pattern, e utiliza o tsyringe para injeção de dependências. A autenticação JWT é gerenciada no arquivo `auth`, com o intuito de praticar.

### Frontend

O frontend é construído com Next.js. O React Hook Form é utilizado para o gerenciamento de formulários, enquanto o Zod cuida da validação dos dados. A comunicação com o backend é realizada através do Axios, garantindo uma integração eficiente.

## Como Executar o Projeto

### Backend

1. Navegue até o diretório do backend: `cd backend`
2. Instale as dependências: `npm install`
3. Execute o servidor: `npm run dev`

### Frontend

1. Navegue até o diretório do frontend: `cd frontend`
2. Instale as dependências: `npm install`
3. Execute o aplicativo: `npm run dev`

O projeto estará disponível em http://localhost:3000/.

## Conclusão

O UserAuthProject é uma aplicação robusta que implementa um sistema completo de CRUD para usuários, com autenticação JWT salvo nos cookies. A separação entre o frontend e o backend, juntamente com a utilização de tecnologias modernas e boas práticas de desenvolvimento, proporciona uma base sólida para a construção de aplicações web escaláveis e eficientes.

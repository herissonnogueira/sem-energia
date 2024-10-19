# Sem Energia

Sem Energia é uma aplicação web que permite aos usuários registrar ocorrências de falta de energia no estado de São Paulo.

## Funcionalidades

- Registro de ocorrências de falta de energia
- Consulta automática de endereço por CEP
- Notificações toast para feedback do usuário
- Interface responsiva para uso em dispositivos móveis e desktop

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Supabase
- React-Toastify

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/herissonnogueira/sem-energia.git
   ```

2. Entre no diretório do projeto:
   ```
   cd sem-energia
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:
```
npm run dev
```
	
O aplicativo estará disponível em `http://localhost:5173`.

## Contato

Herisson Nogueira - [LinkedIn](https://www.linkedin.com/in/herissonnogueira/)

<p align="center">
  <img alt="Repo size"  src="https://img.shields.io/github/repo-size/geovaneborba/ignite-clean-ddd?color=4f46e5&style=for-the-badge">
  <img alt="GitHub top language"  src="https://img.shields.io/github/languages/top/geovaneborba/ignite-clean-ddd?color=4f46e5&style=for-the-badge">
  <img alt="GitHub language count"  src="https://img.shields.io/github/languages/count/geovaneborba/ignite-clean-ddd?color=4f46e5&style=for-the-badge">
</p>

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0;
  <a href="#books-aprendizado">Aprendizado</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#warning-pré-requisitos"> Pré requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a> &#xa0;
</p>

<br>

## :dart: Sobre

Projeto desenvolvido durante o módulo de **Clean Architecture e Domain-Driven Design (DDD)** do Ignite da Rocketseat. Aqui a regra de negócio é implementada de forma isolada de frameworks, banco de dados ou qualquer detalhe de infraestrutura, seguindo os princípios de Entities, Repositories, tratamento funcional de erros (padrão `Either`) e testes unitários da camada de domínio.

O foco não é entregar uma API funcional, e sim exercitar a **separação de responsabilidades** e a **testabilidade** do núcleo de domínio de uma aplicação.

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :books: Aprendizado

- Princípios de Clean Architecture e Domain-Driven Design (DDD)
- Modelagem de Entidades e regras de negócio isoladas de frameworks
- Tratamento funcional de erros com o padrão `Either` (evitando `throw`/`try-catch` na camada de domínio)
- Repositórios em memória para testes unitários rápidos e independentes de banco de dados
- Testes unitários com Vitest e geração de dados fake com Faker

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :rocket: Tecnologias

As seguintes tecnologias foram usadas na construção do projeto:

- Node.js
- TypeScript
- Vitest
- Faker.js
- ESLint

Outras dependências e ferramentas utilizadas podem ser encontradas no arquivo [package.json](./package.json)

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :warning: Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :checkered_flag: Começando

```bash
# Clone este repositório
$ git clone https://github.com/geovaneborba/ignite-clean-ddd.git

# Entre na pasta e instale as dependências
$ cd ignite-clean-ddd && npm i

# Rode a suíte de testes unitários
$ npm run test

# Ou rode os testes em modo watch, reexecutando a cada alteração
$ npm run test:watch

# Para checar a cobertura de testes
$ npm run test:coverage
```

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>
<p align="center">Feito com ❤️ por <a href="https://github.com/geovaneborba" target="_blank">Geovane Borba</a></p>

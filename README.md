<div align="center">

<h1 id="toc">Rin.rocks - <code>r17{x}</code> Sites!</h1>
  <p><strong>Hi 🙋‍♂️! I'am Rin</strong></p>
  <p>
  a Software Engineer, Interest in topic (φ + Losophy), (λ + μετα-Programming), D.x (Developer Experience), & Web Tech.
  </p>

<p align="center">
  <a href="#overview"><strong>Overview</strong></a>  • 
  <a href="#tech-stack"><strong>Tech Stack</strong></a>  • 
  <a href="#development"><strong>Development</strong></a>  • 
  <a href="#acknowledgement"><strong>Acknowledgement</strong></a>
</p>

[![Rin.Rocks](https://github.com/r17x/rin.rocks/actions/workflows/ci.yml/badge.svg)](https://github.com/r17x/rin.rocks/actions/workflows/ci.yml)
[![Built with Nix](https://github.com/nix-community/builtwithnix.org/raw/master/badge.svg)](https://builtwithnix.org)

</div>

## Overview

This is my personal sites repository. I do Thinker, Hacking, Experiment, and anything what I need to know. **Because of curiousity**.

```mermaid
graph LR
  A[Content] -- export --> B[Static Sites]
  B -- convert --> C[OCaml Module]
  C -- compile --> D[1 Static Binary]
  D --> E(Ready to Run)
```

### Tech Stack

#### Frontend

- [NextJs](https://nextjs.org/) _**The React Framework for the Web**_ by [Vercel](https://vercel.com/).
- [Chakra-UI](https://chakra-ui.com/) _**a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.**_.

#### Backend

- [Dream](https://aantron.github.io/dream/) _**Tidy Web framework for OCaml and ReasonML**_ by @aantron.
- [ocaml-crunch](https://github.com/mirage/ocaml-crunch) _**Convert a filesystem into a static OCaml module**_ by @mirage.

#### Tools

- [Yarn@v3](https://yarnpkg.com/) _**Yarn is a package manager that doubles down as project manager. Whether you work on one-shot projects or large monorepos, as a hobbyist or an enterprise user, we've got you covered.**_
- [Nodejs](https://nodejs.org/en/) _**Node.js® is an open-source, cross-platform JavaScript runtime environment.**_
- [OCaml](https://ocaml.org/) _**General-Purpose, Industrial-Strength, Expressive, and Safe.**_

## Development

### Prerequisites

You don't technically need to run or setup anything on your end (except [Nix](https://zero-to-nix.com/start/install)). But if you want to setup for your own needs, you can take a look into [flake.nix](flake.nix) and [.envrc.example](.envrc.example).

### Commands

> Most of the commands run in the root project directory.

#### run Frontend

```bash
nix develop . -c yarn install && yarn dev
```

**OR**

```bash
nix develop
yarn install && yarn dev
```

#### run Backend

```bash
nix run .#backend
```

#### run nix-shell

Available shell options:

- default with all tools from frontend and backend.

```
nix develop
```

- frontend with yarn, node, and related nodejs ecosystem tools.

```
nix develop .#frontend
```

- backend with fswatch and ocaml ecosystem tools.

```
nix develop .#backend
```

See [**Detail Here**](./nix/devshell.nix#L41-L75).

## Deployment

- Currently using [Vercel: rin_rocks](https://vercel.com/ri7nz/rin-rocks).
- For single static binary read this github actions [workflow](.github/workflows/ci.yml).

# Acknowledgement

- @Xe - [https://xeiaso.net](https://github.com/Xe/site) for talk about _**"My Blog is Hilariously Overengineered to the Point People Think it's a Static Site"**_ at [GambiConf](https://gambiconf.dev/).

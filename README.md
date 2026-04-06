<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<!--![Visitors](https://visitor-badge.laobi.icu/badge?page_id=deadislove.nestJS-microkernel-architecture-template) -->
![Visitors](https://img.shields.io/badge/visitors-16_total-brightgreen)
![Clones](https://img.shields.io/badge/clones-35_total_25_unique-blue) <!--CLONE-BADGE-->

## 🧩 Project Overview

This template implements a Microkernel (Plug-in) architecture with NestJS. It enables modular design, dynamic feature loading, and scalable domain separation. It’s well-suited for building feature-rich and extensible backend systems.

<a href='https://ko-fi.com/F1F82YR41' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## 🏗 Architecture Concept

This system is divided into 3 major containers:

- Core Container

  - Coordinates plugin lifecycle and provides core services (Logger, Registry, Loader).

- Plugin Container

  - Holds feature modules (User, Product, etc.), each as an independent plugin.

- Infrastructure Container

  - Provides shared infrastructure like database connections using DatabaseFactory.

The structure promotes low coupling, testability, and scalability.

## 🧱 Project Structure

Based on the architecture graph, here’s the folder layout:

```
├───src
│   ├───core
│   │   ├───core.module.ts
│   │   ├───core.service.ts
│   │   ├───logger
│   │   │   └───logger.service.ts
│   │   ├───plugin
│   │   │   ├───plugin.registry.ts
│   │   │   └───dynamic.loader.ts
│   │   └───core.interface.ts
│   │
│   ├───plugins
│   │   ├───user
│   │   │   ├───user.module.ts
│   │   │   ├───user.controller.ts
│   │   │   ├───user.service.ts
│   │   │   ├───user.repository.ts
│   │   │   └───user.entity.ts
│   │   └───product
│   │       ├───product.module.ts
│   │       ├───product.controller.ts
│   │       ├───product.service.ts
│   │       ├───product.repository.ts
│   │       └───product.entity.ts
│   │
│   ├───infrastructure
│   │   ├───database
│   │   │   ├───database.module.ts
│   │   │   ├───database.factory.ts
│   │   │   ├───sqlite
│   │   │   ├───postgres
│   │   │   └───mysql
│   │
│   ├───shared
│   └───main.ts
└───test
```

## 🧩 Plugin Development Guide

When developing a new plugin, follow the steps below:

1. Create a directory under ```src/plugins```, e.g., order

2. Implement the following components:

    - ```order.module.ts```
    - ```order.controller.ts```
    - ```order.service.ts```
    - ```order.repository.ts```
    - ```order.entity.ts```

3. Register the plugin in the ```PluginRegistry```

4. (Optional) Implement the ```initialize()``` and ```shutdown()``` lifecycle hooks

5. For logging, use ```LoggerService``` via dependency injection (DI)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Da-Wei Lin](https://www.linkedin.com/in/da-wei-lin-689a35107/)
- Website - [David Weblog](https://davidskyspace.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

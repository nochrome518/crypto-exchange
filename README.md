## Pre Installation
download kafka, from the downloaded repository, run below scripts in separate terminals.
NOTE: below commands is used only for windows.
```bash
$ bin\windows\zookeeper-server-start.bat config\zookeeper.properties
```
```bash
$ bin\windows\kafka-server-start.bat config\server.properties
```
# Setting Env
rename example.env => .env , then and replace USER_NAME and PASSWORD with your db credentials.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

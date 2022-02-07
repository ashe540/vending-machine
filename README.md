# Vending Machine

A project (Angular + Node.js) that allows interacting with a vending machine. 

<p style="text-align: center;"><img src="https://cdna.artstation.com/p/assets/images/images/030/203/116/4k/jonjo-hemmens-01-darker.jpg" ></p>

<span>Credit to Jonjo Hemmens for the image (<a href="https://www.artstation.com/artwork/5Xdwbz" target="_blank">Art Station</a>)</span>

## Applications

This project was generated using [Nx](https://nx.dev). All applications are under the `apps` directory. This monorepo is made up of:

- api: this is the backend Node.js (Typescript) API service. The API will be available on http://localhost:4000.
- vending-machine: this the Angular frontend application. Navigate to http://localhost:4200/.

## Running the applications

Run `nx serve api` to run the TS Node.js/Express API server.

Run `ng serve vending-machine` to start the frontend. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build my-app` to build the project, where `my-app` is the name of the application you wish to build. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test api` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

# Galleri Frontend

This repository contains the frontend for the Galleri webapp. It is written in javascript and uses nextjs.

## Table of Contents

- [Galleri Frontend](#galleri-frontend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Start the webserver in dev mode](#start-the-webserver-in-dev-mode)
    - [Start the webserver in production mode](#start-the-webserver-in-production-mode)
    - [NPM Prerequisites](#npm-prerequisites)
  - [makefile](#makefile)
    - [Install and configure toolchain dependencies](#install-and-configure-toolchain-dependencies)
    - [Make Prerequisites](#make-prerequisites)
  - [Usage](#usage)
  - [Prettifier](#prettifier)
  - [Architecture](#architecture)
    - [Diagrams](#diagrams)
    - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [Contacts](#contacts)
  - [Licence](#licence)

## Installation

To get started with this repo follow these steps:

### Clone the repository

```shell
git git@github.com:NHSDigital/Galleri-Frontend.git
cd Galleri-Frontend
```

### Install dependencies

```shell
npm install
```

### Start the webserver in dev mode

```shell
npm run dev
```

### Start the webserver in production mode

When this code is deployed into production it will use a port specified by an environmental variable, but you can run this locally to verify it works correctly:

```shell
PORT=8080 npm run start
```

### NPM Prerequisites

nodejs - 16.20.0

## makefile

To use the makefile follow these instructions:

```shell
cd Galleri-Frontend
```

### Install and configure toolchain dependencies

```shell
make config
```

### Make Prerequisites

The following software packages or their equivalents are expected to be installed

- [GNU make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/)

## Usage

After a successful installation, provide an informative example of how this project can be used. Additional code snippets, screenshots and demos work well in this space. You may also link to the other documentation resources, e.g. the [User Guide](./docs/user-guide.md) to demonstrate more use cases and to show more features.

## Prettifier

For linting we have decided to use [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) Which we have created config files for called `.prettierrc.yaml` This file enforces consistancy between all users.

To set this up you need to install the prettier plugin using the link above.

Once it is installed you can set up the default formatter by opening a file in the repo and using the shortcut `ctrl + p` to open the vscode command interface. Then enter `> Format Document` and select `Format Document` from the dropdown. The first time you do this it will say something like **No default formatter setup for this project** You can click on the `Configure` button and select Prettier from that list.

To make formatting easier you can enable **Format on Save** by going into preferences and searching for `format on save` then check the tickbox to enable it. Now everytime you save your file with `ctrl + s` or `command + s` then it will format the file for you.

## Architecture

### Diagrams

The [C4 model](https://c4model.com/) is a simple and intuitive way to create software architecture diagrams that are clear, consistent, scalable and most importantly collaborative. This should result in documenting all the system interfaces, external dependencies and integration points.

![Repository Template](./docs/diagrams/Repository_Template_GitHub_Generic.png)

### Configuration

Most of the projects are built with customisability and extendability in mind. At a minimum, this can be achieved by implementing service level configuration options and settings. The intention of this section is to show how this can be used. If the system processes data, you could mention here for example how the input is prepared for testing - anonymised, synthetic or live data.

## Contributing

Describe or link templates on how to raise an issue, feature request or make a contribution to the codebase. Reference the other documentation files, like

- Environment setup for contribution, i.e. `CONTRIBUTING.md`
- Coding standards, branching, linting, practices for development and testing
- Release process, versioning, changelog
- Backlog, board, roadmap, ways of working
- High-level requirements, guiding principles, decision records, etc.

## Contacts

Provide a way to contact the owners of this project. It can be a team, an individual or information on the means of getting in touch via active communication channels, e.g. opening a GitHub discussion, raising an issue, etc.

## Licence

> The [LICENCE.md](./LICENCE.md) file will need to be updated with the correct year and owner

Unless stated otherwise, the codebase is released under the MIT License. This covers both the codebase and any sample code in the documentation.

Any HTML or Markdown documentation is [© Crown Copyright](https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/) and available under the terms of the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

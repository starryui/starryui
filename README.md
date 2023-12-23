# Starry UI

![starry project logo, black square with 3 starlike patterns of pixels](./starryui.png)

Starry UI Monorepo

## Installation

Get more information at https://starryui.com/

See the list of available components at https://www.npmjs.com/org/starryui

## Development

To run the development server after cloning this repository, run `npm install` and `npm run docs:watch`, the server will be available at http://localhost:8001

To create a new package i.e. called `button`, run `npm init --scope=@starryui -y -w ./packages/button`

To install one package as a dependency of another package, run `npm i @starryui/<depname> -w @starryui/<destname>`

To release a new version of all packages (be sure to update version numbers first, uniformly for all packages), run `npm run publish-all`

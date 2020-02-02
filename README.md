# Torus x Matic Integration

An example dapp to showcase matic integration with torus

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To start with, make sure your node version is up to 10.x

```
node -V
```

1. Clone the repo

```
git clone git@github.com:torusresearch/torus-matic.git
```

2. Install dependencies.

```
cd dapp && npm i
```

To deploy the contract, copy it over to remix-ide and deploy from there.

Remember to update the cinemaAddress on [line 3 of web3.js](/dapp/src/helpers/web3.js)

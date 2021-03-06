# Patronus.land

This project was bootstrapped with React and Solana.

You can [check out the demo](https://www.patronus.land) (using devnet) and our [presentation](https://youtu.be/6QGM_1Nw7_8), use the code as a reference, or run it yourself to start accepting decentralized payments in-person.

## Prerequisites

To build and run this app locally, you'll need:

-   Node.js v14.17.0 or above
-   Yarn
-   <details>
        <summary> Setup two wallets on <a href="https://phantom.app">Phantom</a> (Merchant and Customer) </summary>

    #### 1. Create merchant wallet

    Follow the [guide][1] on how to create a wallet. This wallet will provide the recipient address.

    #### 2. Create customer wallet

    Follow the [guide][1] on how to create another wallet. This wallet will be paying for the goods/services.

    #### 3. Set Phantom to connect to devnet

    1. Click the settings icon in the Phantom window
    2. Select the "Change network" option and select "Devnet"

    #### 4. Airdrop SOL to customer wallet

    Use [solfaucet][3] to airdrop SOL to the customer wallet.

    #### 5. Airdrop USDC to customer wallet

    Use [dummyspl][4] to airdrop SOL to the customer wallet.
    > You'll need SOL in the customer wallet to pay for the goods/services + transaction fees

 </details>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Install dependencies
```shell
npm i
```

### Install ts-node globally
```shell
npm i -g ts-node
```

### Enter client catalog
```shell
cd client
```

### Install client dependencies
```shell
npm i
```

### Start the local dev server
```shell
npm run dev
```

### Open the app
```shell
open "http://localhost:5000"
```

## Contributors

- Marek [MarekZ](https://github.com/katakumby)
- Bruno [brunocisowski](https://github.com/brunocisowski)
- Piotr [PMPSpadlo](https://github.com/PMPSpadlo)
- Veronika [veronikadumalo](https://github.com/veronikadumalo)
- Filip [wojcikfil](https://github.com/wojcikfil)
- Kuba [Kubaszenko](https://github.com/Kubaszenko)
- Maciek [maciumpek](https://github.com/maciumpek)

[1]: https://help.phantom.app/hc/en-us/articles/4406388623251-How-to-create-a-new-wallet
[3]: https://solfaucet.com/
[4]: https://spl-token-faucet.com/

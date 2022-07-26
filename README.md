# NFT Collection from Etherscan

## Introduction

This project is a project which gets the nft collection metadata on specific wallet address from etherscan using moralis api.

### `Chain supported`
1. Ethereum (ETH)
2. Binance Smart Chain (BSC)
3. Polygon (MATIC)
4. Avalanche (AVAX)
5. Fantom (FTM)

## Pre requisites

### `Create the Moralis Server`

1. Sign up at Moralis
2. Create the new dapp.
   - Select Environment -> Mainnet (Ethereum, Polygon, Bsc, Fantom, etc.. ) You can select the options you want.
   - Select Region 
   - Name Your Dapp
     You have to enter your dapp name.

3. Start Server
   - Click your dapp setting button.
   - In the Dapp details section, copy the dapp URL and paste it into serverURl variable in main.js.
   - In the Dapp details section, copy the Application ID and paste it into appId variable in main.js.

### `Cloud Function setting`

In the Cloud function section on left sidebar in Moralis, follow the documents.

1. Set up Cloud Functions in your IDE
npm install -g moralis-admin-cli

2. Execute the watch-cloud-file and change to the correct path of your cloud file

moralis-admin-cli watch-cloud-file --moralisApiKey (your cli api key) --moralisApiSecret (your cli secret) --moralisSubdomain (your moralis sub domain) --autoSave 1 -p ./javascript/cloud.js

** you can copy the directive in the cloud function section, and change "moralis-admin-cli watch-cloud-folder" to "moralis-admin-cli watch-cloud-file" and the moralis cloud file path, "--moralisCloudfolder /path/to/cloud/folder" to "-p ./javascript/cloud.js".
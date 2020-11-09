# nft
Crypto Collectible NFT Tutorial with ERC-721 Tokens
## Dependencies<br/>
Install these prerequisites to continue

NPM: https://nodejs.org <br/>
Truffle: https://github.com/trufflesuite/truffle <br/>
Ganache: http://truffleframework.com/ganache/ <br/>
Metamask: https://metamask.io/ <br/>
<br/>
## Step 1. Clone the project
```bash 
https://github.com/dappuniversity/nft.git
```

## Step 2. Install dependencies
```bash
cd nft
npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. 

## Step 4. Compile & Deploy Election Smart Contract
```truffle migrate --reset``` You need to migrate contract in order to deploy in your local system

## Step 5. Configure Metamask
-Unlock Metamask <br/>
-Connect metamask to your local Etherum blockchain provided by Ganache.<br/>
-Import an account provided by ganache.<br/>

## Step 6. Run the Front End Application
```
cd src
npm start
```
Now you Blockchain web-app is serverd on http://localhost:8000


## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

It uses Public Key Cryptography. By using Elliptic Curve Digital Signatures I made it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

If you want to take on this challenge too.
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4


### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/


### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

> _Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


### Usage

1. Setup the client and server with the instructions above
2. Generate new random accounts

    Make sure you are in the root directory of the project

    ```bash
    cd server/scripts
    node gen.js
    ```

    This generates a new random account for you, and uses keccak256 ethereum method to make the public key smaller in length.
    You can add this accounts in the index.js file in the  `/server` directory.

    > NOTE: Everytime the server restarts, the user balances are reset to default
3. To transfer cash, you would need to sign the message hex yourself, giving you total authority over your private key.

    There is a CLI tool in server scripts that you can use

    ```bash
    cd server/scripts
    node signer.js -p PRIVATE_KEY -d MESSAGE_HEX
    ```

    You will get the signature, recovery bit, and signature + recovery_bit in a single string so that you can copy and paste that easily on the website and send funds.

    If the signature is not valid, or is not valid for the user sending funds. Then it won't work.

    Public key cryptography made sure that I can verify who signed a message without have the signer's private key.
# Getting Started

## Install

1. This server runs using the following versions:

   ```
   node v6.14.4
   npm v6.4.1
   ```

   You can install these [here](https://nodejs.org/en/download/releases/). 
   **TIP**: If you are running on Linux or MacOS, we recommend node version manager found [here](https://github.com/creationix/nvm).

2. Run the following command to install all sub-dependencies

   ```
   npm install
   ```

3.  For development, install a local MongoDB server from [here](https://docs.mongodb.com/manual/administration/install-community/).

   **TIP**: A graphical browser for your database is nice to have. Find one [here](https://robomongo.org/).

## Configure

1. Create a Firebase project [here](https://console.firebase.google.com/u/0/?pli=1)

2. Navigate to the service accounts tab in the project settings
   ![firebase_settings](/docs/firebase_settings.JPG)

3. Use the 'Generate new private key' button to download a file called serviceAccountKey.json into /configs. 

4. Run the following command from the root of the repository:

   `cp ./configs/index.js.TEMPLATE ./configs/index.js`

5.  Update the firebaseConfig in '/configs/index.js' to point to your firebase (this is also on the Service accounts tab)

   ![firebase_url](/docs/firebase_url.JPG)

6. Update the databaseConfig in '/configs/index.js' to point to your database

   ![database_url](/docs/database_url.JPG)

7. TODO: include STUN/TURN server set up

## Run

```
npm start
```


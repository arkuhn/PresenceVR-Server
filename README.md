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

### Firebase

1. Create a Firebase project [here](https://console.firebase.google.com/u/0/?pli=1). If you have already made a Firebase project with the UI readme file, go to your console for that project.

2. Navigate to the service accounts tab in the project settings
   ![firebase_settings](/docs/firebase_settings.JPG)

3. Use the 'Generate new private key' button to download a file called serviceAccountKey.json into /configs. 

4. Run the following command from the root of the repository:

   `cp ./configs/index.js.TEMPLATE ./configs/index.js`

5. Update the firebaseConfig in '/configs/index.js' to point to your firebase (this is also on the Service accounts tab)

   ![firebase_url](/docs/firebase_url.JPG)

### Twilio

1. To setup your Twilio configs, follow the guide [here]()

### Database

1. Install MongoDB. Here's [a helpful guide](<https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/>)

   **Note**: if you have another database you'd like to use, you can use that one. However, we have found this database to be easy to use.

2. Update the databaseConfig in '/configs/index.js' to point to your database

![database_url](C:/Users/johnn/Documents/projects/PresenceVR-Server/docs/database_url.JPG)



## Run

### **npm start**

Use this command to start your development server

## Deploy

### gcloud app deploy

Use this command to deploy to your Google Cloud Platform server

- You must have have a project on Google Cloud Platform to host this app. Find documentation for creating a project [here](<https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project>)
- You must have Cloud SDK installed to use this command. Install Cloud SDK [here](<https://cloud.google.com/sdk/docs/>)
- Your local database will not work on a deployment. We used MongoDB Atlas as our cloud based database instead. Set up MongoDB Atlas following [these instructions](/docs/mongoDB_atlas.md) and replace your databaseConfig url with the new url.


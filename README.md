# Getting Started

## Install

1. Clone the repository from Github

   `git clone https://github.com/arkuhn/PresenceVR-Server.git`
   
2. This server runs using the following versions:

   ```
   node v6.14.4
   npm v6.4.1
   ```

   You can install these [here](https://nodejs.org/en/download/releases/). 
   **TIP**: If you are running on Linux or MacOS, we recommend node version manager found [here](https://github.com/creationix/nvm).

3. CD into the folder and run the following command to install all sub-dependencies

   ```
   npm install
   ```

4. Install Cloud SDK from [here](<https://cloud.google.com/sdk/docs/>) (this will be used later for deployment)

## Configure

### Firebase

1. Create a Firebase project [here](https://console.firebase.google.com/u/0/?pli=1)

2. Navigate to the service accounts tab in the project settings
   ![firebase_settings](/docs/firebase_settings.JPG)

3. Use the 'Generate new private key' button to download a file called serviceAccountKey.json into /configs

4. Run the following command from the root of the repository:

   `cp ./configs/index.js.TEMPLATE ./configs/index.js`

5. Update the firebaseConfig in '/configs/index.js' to point to your firebase (this is also on the Service accounts tab)

   ![firebase_url](/docs/firebase_url.JPG)

### Database

1. For development, install a local MongoDB server from [here](https://docs.mongodb.com/manual/administration/install-community/)

   **TIP**: A graphical browser for your database is nice to have. Find one [here](https://robomongo.org/)

2. Update the databaseConfig in '/configs/index.js' to point to your database

![database_url](/docs/database_url.JPG)

### Twilio

1. Create your Twilio configurations. A guide can be found [here](<https://www.twilio.com/blog/2018/03/video-chat-react.html>)

## Develop

### npm start

This will run a local development server in your shell

**Note**: All console logging will be shown in your terminal where you ran this command

## Deploy

### gcloud app deploy

Once you have configured the application, deploy it using this command

- You must have have a project on Google Cloud Platform to host this app. Find documentation for creating a project [here](<https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project>)
- You must have Cloud SDK installed to use this command. Install Cloud SDK [here](<https://cloud.google.com/sdk/docs/>)

Original documentation for deploying an web service is [here](<https://cloud.google.com/appengine/docs/standard/nodejs/building-app/deploying-web-service>)
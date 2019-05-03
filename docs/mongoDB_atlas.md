# Set Up MongoDB Atlas

1. Follow prompts [here](<https://www.mongodb.com/cloud/atlas>)

2. Follow the Get Started checklist on the bottom left

   ![mongodb1](/mongodb1.PNG)

**Notes**:

- When you create your database user, be sure to use the Autogenerate Secure Password option and to save this password. This is how the app will access this database

  ![mongodb2](/mongodb2.PNG)

- Use the Allow Access From Anywhere option for the Whitelist Your IP Address list item. This will allow your app to connect from Google Cloud Platform

  ![mongodb3](/mongodb3.PNG)

- When selecting your connection, use the 2.2.12 or later option for Version. In addition, in the string it gives you, take out the very end of the connection string, `&retryWrites=true`. If this is at the end of your connection string, your app will not connect properly

  ![mongodb4](/mongodb4.PNG)
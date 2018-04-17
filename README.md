
## Pre-reqs
1) Install nodejs & npm: https://nodejs.org/en/download/package-manager/
2) Make sure git is installed on your machine: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Setup

1. Clone the git repository using the following command

        git clone https://github.com/danielroach9/GRR.git
2. Install the respective node packages using the following command

        npm install
3. Change the 'api.config.js' (located in grr-ui/src/templates/api.config.js) file's url variable to your respective domain

        export const API_URL = '<YOUR_DOMAIN_HERE>';
                ex. export const API_URL = 'http://localhost:8080';
4. Run the following command to build the UI code

        npm run build
       


## How To Run the server locally

1) Open a terminal and run the following. Keep it running. This command runs your server on port 8080 and builds the front-end code.
        
        npm run devstart
        
2) Navigate to http://localhost:8080 and you should see your instance of the application running.

        
      

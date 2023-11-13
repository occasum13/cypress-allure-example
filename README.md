cypress-allure-example

    This project aims to serve as an example for cypress-alure report testing

Techs used

JavaScript Cypress

Prerequisites

    Have the node, cypress(12.14.0 or older for allure reports, + scoop, java and allure itself), installed on the machine
    Installation link for cypress (https://docs.cypress.io/guides/getting-started/installing-cypress.html#Direct-download)
    Installation link for allure (https://docs.qameta.io/allure/)
    Clone the project on your preference directory and run npm install

For GCP Pipeline CI/CD:
    You need to create a dockerhub image containing Node.JS (NODE_VERSION=12.18.3)^, Yarn (YARN_VERSION=1.22.4)^ and Java (JAVA_VERSION=8.0.352-amzn) for yaml steps 1 and 2.
    You might need some extra steps above those first ones if you need proxy connections and stuff.

Structure

    Cypress
        Fixtures(Folder with default cypress file)
        e2e(Folder with API/UI directories)
        Screenshots(Folder where screenshots of the tests execution are stored)
        Support(Folder with command files)
        Videos(Folder where videos of the tests execution are stored)
        node_modules(Dowloaded automatically on npm install)
        devops(Folder with ci)
        output(Folder containing an array of cypress errors which will be created/cleaned automatically when proper scripts run locally/vm)

How to run

    Open the terminal service after running your proxy and setting up your .env/gcp secrets correctly

    Access the directory and run the tests with the command below:
        Use the command npm run allure-test for complete headless execution with allure
        Use the command allure generate allure-results --clean -o allure-report to generate a allure report
        Use the command allure open to open a local allure-report web-page containing the test results

    Alternatively you can run only cypress, headless or by a webpage with the command below:
        Use the command npm run cypress-test for complete headless execution without allure
        Use the command npx cypress open to open the execution window and select the cases to be executed

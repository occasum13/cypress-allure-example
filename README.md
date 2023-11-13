cypress-allure-example
Automated testing

    This project aims to serve as an example for cypress-alure report testing

alt text
Techs used

JavaScript Cypress
Prerequisites

    Have the node, cypress(12.14.0 or older for allure reports, + scoop, java and allure itself), installed on the machine
    Installation link for cypress (https://docs.cypress.io/guides/getting-started/installing-cypress.html#Direct-download)
    Installation link for allure (https://docs.qameta.io/allure/)
    Clone the project on your preference directory and run npm install

Structure

    Cypress
        Fixtures(Folder with default cypress file)
        e2e(Folder with API directories)
        Screenshots(Folder where screenshots of the tests execution are stored)
        Support(Folder with command files for nps-raimundo-api API)
        Videos(Folder where videos of the tests execution are stored)
        node_modules(Dowloaded automatically on npm install)
        devops(Folder with ci for nps-raimundo-api)
        output(Folder containing an array of cypress errors)

How to run

    Open the terminal service after running your proxy and setting up your .env correctly

    Access the directory and run the tests with the command below:
        Use the command npm run allure-test for complete headless execution with allure
        Use the command allure generate allure-results --clean -o allure-report to generate a allure report
        Use the command allure open to open a local allure-report web-page containing the test results

    Alternatively you can run only cypress, headless or by a webpage with the command below:
        Use the command npm run cypress-test for complete headless execution without allure
        Use the command npx cypress open to open the execution window and select the cases to be executed

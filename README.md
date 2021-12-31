<p align="center">
    <a href="https://github.com/dekmak/tennis_table_frontend" title="Tennis Table Scoring App">
        <img src="https://dev-tennistable-app-players.s3.us-east-2.amazonaws.com/ping-pong-app-logo.jpg" width="250px" alt="Tennis Table Scoring App">
    </a>
</p>
<h1 align="center">
    <b>Tennis Table Scoring Application Front-end</b>
</h1>

![version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

<p>
This React based UI application is providing a tool to manage Tennis Table (ping pong) games, players and scoring. It is using a microservices back-end hosted on AWS using NodeJs and Serverless.
</p>

<div align="center">
</div>

## Prerequisites

- A terraform script should be run to prepare the AWS infrastructure. You can find it here: [Tennis Table Infrastructure](https://github.com/dekmak/tennis_table_infra)
- A Serverless project that runs a GraphQl (through AppSync) should be deployed to an AWS account. You can find it here: [Tennis Table Backend](https://github.com/dekmak/tennis_table_platform)

## Deployment

Rquired Environment variables:
- `REACT_APP_APIKEY`
- `REACT_APP_APPSYNC_ENDPOINT`

To run locally, you can call the following command after ensuring you have the required '.env' file with corresponding values:

```bash
  npm run start
```

This app can be deployed on AWS Amplify; You can link your Github repository to a new Amplify application, and just ensure to fill the required env variables on the corresonding section.

## Credits

- React UI Theme provided by https://bloomui.com

## Authors

- [Ahmad Dekmak](https://www.github.com/dekmak)

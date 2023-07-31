# Cron Management Express

This project uses Express.js to create a server that manages and executes scheduled tasks (crons). It provides an API for manipulating the crons and has a modular structure to facilitate the addition of new endpoints and functionalities.

## Setup

Before running the project, make sure you have Node.js and npm installed on your machine.

Clone this repository: git clone https://github.com/lsilva92/cron-manager-express.git

Navigate to the project directory: cd repository-name

Install project dependencies: npm install

## Running the Project

To start the server and run the project, execute the following command:

```bash

npm  start

```

The server will start and be available at http://localhost:8080. You can access the API and interact with the endpoints defined in the cronRoutes.js file.

## File Structure

```

├── controllers/

│ └── cronController.js

├── routes/

│ └── cronRoutes.js

├── jobs/

│ └── script.js

├── templates/

├── utils/

| └── email.js

│ └── readJsonFile.js

| └── scheduler.js

├── cron-data/

│ └── crons.json

├── index.js

└── package.json

```

- The **index.js** file is the entry point of the server and configures the Express.js application.

- The **controllers** folder contains the **cronController.js** file, which defines the actions of the crons (e.g., start, stop, list).

- The **routes** folder contains the **cronRoutes.js** file, where the API endpoints related to the crons are defined.

- The **jobs** folder contains the js script files, where the cron scripts are located.

- The **templates** folder contains the html files of the email templates.

- The **utils** folder contains the utility functions used in the project.

- The **cron-data** folder contains the **crons.json** file, which stores an array of objects representing the created crons.

## API Endpoints

| Method |        EndPoint        |           Description |
| ------ | :--------------------: | --------------------: |
| POST   |     /api/v1/crons      |           Create Cron |
| GET    |     /api/v1/crons      | Get All created crons |
| POST   | /api/v1/crons/startall |       Start all crons |
| POST   | /api/v1/crons/stopAll  |        Stop all crons |
| POST   |  /api/v1/crons/start   |    Start cron by name |
| POST   |   /api/v1/crons/stop   |     Stop cron by name |

## Cron Model

A cron is represented by an object with the following structure:

```json
{
  "id": "1",
  "name": "Example Cron",
  "schedule": "0 0 * * *",
  "command": "node script.js",
  "active": true
}
```

- `id` (string): unique identifier of the cron.
- `name` (string): descriptive name of the cron.
- `schedule` (string): cron expression that defines the frequency of cron execution.
- `command` (string): the command to be executed by the cron.
- `active` (boolean): indicates whether the cron is active or not.

### License

This project is licensed under the [MIT License](https://github.com/lsilva92/cron-manager-express/blob/main/LICENSE).

# Job application portal

ExpressJS service (written in Typescript) to add jobs, apply to jobs by adding Cover letter (Markdown file) using Multer for uploading and display Jobs with all applications for it, along with a HTML rendered Markdown cover letter (markdown-it). The jobs and applications are integrated with pagination and filtering through query parameters. Also, you may edit your job applications, as well as the posted jobs, and withdraw/delete jobs and applications.

Authentication done with JWT (using PassportJS) and Authorization done using bcrypt and PassportJS. Data stored in MongoDB (data stored locally), and connected through MongooseJS ODM. Following RESTful naming and design for APIs.

## Features

- Login (Authorization) of user to create job
- JWT Authentication for APIs
- Add Jobs and apply for them
- View Jobs list and list of applicants
- Pagination and filtering through query parameters
- View applicants' cover letter as a HTML-rendered markdown
- Edit application and Job details
- Delete application and Job

## Demo

Here is a working live demo : https://github.com/hemanth-kumarv/job-application-portal

### ER Diagram

![](/screenshots/ER-Diagram.svg)

### Get API with Pagination and Filtering

`GET /api/v1/job?page=0&size=2&title=Job&skills=A,B` Tested on Insomnia API Testing tool
![](/screenshots/GetJobs.png)

### Rendered Cover letter

`GET /api/v1/application/id/:applicationId/cover-letter` Tested on Insomnia API Testing tool
![](/screenshots/MarkdownRender.png)

### API of ContentType Multipart/FormData

`PUT /api/v1/application/id/:applicationId` Tested on Insomnia API Testing tool
![](/screenshots/EditApplicationAPI.png)

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

Once the dependencies are installed, you need to run `npm run build` to create a dist folder to start the server. You might want to look into `index.ts` to change the port.
Then you can run `npm start` to start the application from the auto generated dist files. You will then be able to access it at `localhost:3000`

Start a MongoDB server, or connect to a cloud database in `config/mongooseConnection.ts`. Import the Insomnia API Testing tool and import the API JSON from `screenshots/InsomniaAPIData.json`.

## APIs

### Applications

- `GET /api/v1/application?page=1&size=2&applicantName=Test` - read applications with pagination and filtering
- `GET /api/v1/application/id/:applicationId/cover-letter` - read HTML version of uploaded cover letter of application
- `POST /api/v1/application/job/id/:jobId` - apply to job and upload cover letter
- `PUT /api/v1/application/id/:applicationId` - edit application of job, as well as the uploaded cover letter
- `DELETE /api/v1/application/id/:applicationId` - withdraw/delete application to a job

### Jobs

- `GET /api/v1/job?page=1&size=2&title=Job` - read jobs with pagination and filtering
- `POST /api/v1/job/job` - add new job
- `PUT /api/v1/job/id/:jobId` - edit job details
- `DELETE /api/v1/job/id/:jobId` - delete job posting

### User

- `POST /api/v1/user` - add user email and password hash to database (should be done before adding jobs)
- `POST /api/v1/user/login` - login using email and password and sign jwt token

## To-do

- Unit Testing
- API input validation
- Logging and Monitoring
- Better auth strategies
- Foreign Relation key (OID) checks for documents
- Cascade strategies for deletion

## Folder structure

```sh
    │
    ├── config/                     # config files for mongoose and passport
    ├── controllers/                # API controllers
    │   ├── v1/                     # version 1 controllers
    │   │   ├── applications/       # controllers for Application related APIs
    │   │   ├── jobs/               # controllers for Job related APIs
    │   │   ├── users/              # controllers for User related APIs
    ├── dist/                       # TS to JS compiled dist folder
    ├── helpers/                    # helper functions used across application
    ├── middlewares/                # middleware functions
    ├── models/                     # mongoose models of database
    ├── routes/                     # routes of APIs
    │   ├── v1/                     # version 1 routes
    │   │   ├── applications.ts     # routes for Application related APIs
    │   │   ├── jobs.ts             # routes for Job related APIs
    │   │   ├── users.ts            # routes for User related APIs
    │   │   ├── index.ts            # router combining all version 1 routes
    │   ├── index.ts                # router combining all version routes
    ├── screenshots/                # screenshots and other files for README.md
    ├── service/                    # service handlers for APIs
    │   ├── v1/                     # version 1 services
    │   │   ├── applications/       # services for Application related APIs
    │   │   ├── jobs/               # services for Job related APIs
    │   │   ├── users/              # services for User related APIs
    ├── types/                      # interfaces for typescript
    ├── index.ts                    # entry point of application
    ├── package.json                # packages installed and start scripts
    ├── README.md                   # Readme document of service
    ├── tsconfig.json               # typescript configurations
```

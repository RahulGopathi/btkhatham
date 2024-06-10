# Angeljob - Job reviewing Application

An application with react and django for job-reviewing processes

The features of this app include:
- Authentication for recruiters
- Page for candidates to fill in the details
- Page for recruiters to see the details of the candidates
- Options to filter candidates
- option to update the status of the application to candidates
- Uses REST API for communication

- you can use the demo account to login into the app:
```
username: demo_angeljob
password: demo1234
```

## Steps to run locally

- Clone this repository and launch code:
    ```
    https://github.com/RahulGopathi/job-reviewing-application.git
    cd job-reviewing-application
    code .
    ```

### With Docker

Ensure that you have installed [Docker](https://docs.docker.com/install/) (with [Docker Compose](https://docs.docker.com/compose/install/)).

Run the development server:
    ```
    make dev-start
    ```

After executing `make dev-start`, you will be running:
* The application on http://localhost:3000 
* The API Server on http://localhost:8000

Make database migrations: 
```
make exec
python manage.py makemigrations
python manage.py migrate
```

Create a superuser: 
```
make exec
python manage.py createsuperuser
```

View logs of docker containers: 
```
make dev-logs
```

To stop the development server: 
```
make dev-stop
```

### Without Docker

- Copy `.env.example` to `.env`
```
cp .env.example .env
```

- To start your frontend and backend development server individually:

    Follow the [Backend Readme](https://github.com/RahulGopathi/btkhatham/tree/main/backend) to setup your backend server

    Follow the [Frontend Readme](https://github.com/RahulGopathi/btkhatham/tree/main/frontend) to setup the frontend server

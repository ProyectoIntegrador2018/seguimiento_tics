# Seguimiento niños, niñas y jóvenes estudiando TICs

Web application that allows to do a follow up on kids and teenagers that took part on summer camps and/or
ICT workshops. The aim of this project is to do a follow up on all of these people to be able to determine if those activities had some sort of inpact on their lifes by helping them pursue a career on such field.

[![Maintainability](https://api.codeclimate.com/v1/badges/b95e9be3744b147c51dc/maintainability)](https://codeclimate.com/github/ProyectoIntegrador2018/seguimiento_tics/maintainability)

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [The Team](#team)
* [Management resources](#management-tools)
* [Technology stack](#technology-stack)
* [Setup the project](#setup-the-project)

### Client Details

| Name                          | Email                         | Role           |
| ------------------            | -----------------             | ----           |
| Silvia Iliana Ramirez Ramirez | iliana.ramirez@csoftmty.org   | Product Owner  |


### Environment URLS

* **Production** - [Production](https://seguimientotic.herokuapp.com/)

### The team

| Name                            | Email              | Role                |
| --------------                  | -----------------  | -----------         |
| Hugo Oswaldo García Perez       | A00815354@itesm.mx | Product Owner Proxy |
| Karla Alexandra Robledo Bandala | A01334885@itesm.mx | Scrum Master        |
| Juan Pablo García Sánchez       | A01281698@itesm.mx | Project Administrator|

### Management tools

* [Github repo](https://github.com/ProyectoIntegrador2018/seguimiento_tics)
* [Backlog]()
* [Documentation](https://drive.com)

## Technology Stack
### Front End Frameworks
- Reactjs

### Backend End Frameworks
- Nodejs
- Expressjs

### Data Persistence
- MongoDB

## Development

### Prerequesites
Before you start, make sure you have  **node** and **npm** installed and running in your computer.

To see if you have them already installed, run the following commands:

```
node -v
npm -v
```

If you don't have them installed, you are able to download on the [Node.js](https://nodejs.org/en/) website. 

_Note: npm is automatically installed when you download Node.js_


### Setup the project

1. Clone this repository into your local machine

```bash
$ git clone https://github.com/ProyectoIntegrador2018/seguimiento_tics.git
```

### Backend Installation and Setup

Switch from the _home project directory_ to the _server_ directory. To do this, run the following command
```
cd server
```

#### Modules installation

Before you are able to start the server, you have to installed all the required modules. To do this you have to run one easy command
```
npm install
```
After running this command, all the modules will be automatically be installed. Please wait until your computer is done installing them. You should see a message on your terminal letting you know that your modules have been installed.

#### .ENV Setup

You have to create a `.env` file where you will keep all secret information. **You should not share the content of this file with anyone else**

##### Create .env file
One easy and recommended way to create this file is with the help of an IDE. 
1. Create a new file and name it .env

That's it! You have successfully created your .env file, now it's time to add relevant information to it.

##### Configure your .env file
On you directory you will find `.envconfig`, this file contains all the information that should go in the `env` that you created in the previous step.
Feel free to copy and paste the contents fron `.envconfig` to `.env`


Lets go through the content of this file
* `PORT` : This is the port where you want to run your app, it's 3001 by default.
* `DATABASE` : This is where you should put the URL of your app's database.
* `JWT_KEY` : This is the **super** secret key that JWT uses to create and hash their authentication token.
* `ADMIN_EMAIL` : This is where you put the email of the super user (admin) of the system
* `ADMIN_PASSWORD` : This is where you put the password of credential of the super user (admin) of the system

Make all your changes accordingly and remember to save them!

#### Running the backend

Everything is now ready to run. From your terminal run the following command
```
npm start
```
Your backend server is now running!


### Frontend Installation and Setup

Luckily the frontend is pretty easy to run and setup. 

Switch from the _home project directory_ to the _client_ directory. To do this, run the following command

```
cd client
```

#### Modules installation

Before you are able to run the client side, you have to installed all the required modules. To do this you have to run one easy command
```
npm install
```

#### Running the frontend

Everything is now ready to run. From your terminal run the following command
```
npm start
```

Your default browser should automatically open with the frontend running!
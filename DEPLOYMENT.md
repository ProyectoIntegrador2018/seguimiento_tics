# Installation Instructions

## Prerequesites
Before you start, make sure you have  **node** and **npm** installed and running in your computer.

To see if you have them already installed, run the following commands:

```
node -v
npm -v
```

If you don't have them installed, you are able to download on the [Node.js](https://nodejs.org/en/) website. 

_Note: npm is automatically installed when you download Node.js_

## Backend Installation and Setup

Switch from the _home project directory_ to the _server_ directory. To do this, run the following command
```
cd server
```

### Modules installation

Before you are able to start the server, you have to installed all the required modules. To do this you have to run one easy command
```
npm install
```
After running this command, all the modules will be automatically be installed. Please wait until your computer is done installing them. You should see a message on your terminal letting you know that your modules have been installed.

### .ENV Setup

You have to create a `.env` file where you will keep all secret information. **You should not share the content of this file with anyone else**

#### Create .env file
One easy and recommended way to create this file is with the help of an IDE. 
1. Create a new file and name it .env

That's it! You have successfully created your .env file, now it's time to add relevant information to it.

#### Configure your .env file
On you directory you will find `.envconfig`, this file contains all the information that should go in the `env` that you created in the previous step.
Feel free to copy and paste the contents fron `.envconfig` to `.env`


Lets go through the content of this file
* `PORT` : This is the port where you want to run your app, it's 3001 by default.
* `DATABASE` : This is where you should put the URL of your app's database.
* `JWT_KEY` : This is the **super** secret key that JWT uses to create and hash their authentication token.
* `ADMIN_EMAIL` : This is where you put the email of the super user (admin) of the system
* `ADMIN_PASSWORD` : This is where you put the password of credential of the super user (admin) of the system

Make all your changes accordingly and remember to save them!

### Running the backend

Everything is now ready to run. From your terminal run the following command
```
npm start
```
Your backend server is now running!

## Frontend Installation and Setup

Luckily the frontend is pretty easy to run and setup. 

Switch from the _home project directory_ to the _client_ directory. To do this, run the following command

```
cd client
```

### Modules installation

Before you are able to run the client side, you have to installed all the required modules. To do this you have to run one easy command
```
npm install
```

### Running the frontend

Everything is now ready to run. From your terminal run the following command
```
npm start
```

Your default browser should automatically open with the frontend running!
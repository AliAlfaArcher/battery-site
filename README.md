# Industrial Energy Battery Site

## Introduction

This web application allows the user to select a battery configuration from a set of available batteries and creates a summary report with the estimated total cost, site’s energy density, estimated land footprint, and layout. 

## Requirements

1. You will need **Git** to be able to clone the repository in your machine.  
2. The application has been containerized with **Docker** for easy installation and execution of packages. In order to build and run the containers, you will need a machine running [Docker Desktop](https://www.docker.com/products/docker-desktop/).
3. An **Internet connection** is also required as Docker will download the base container images and application dependencies during the container build process.

## Installing The App

1. Clone the repository from github.com into your computer:
```
git clone git@github.com:AliAlfaArcher/battery-site.git
```

2. Move into the folder created by the repository (battery-site)

3. Use docker compose to bring up the containers (-d is for detached mode)
```
docker compose up -d
```

## Open The App In A Browser

Navigate to http://localhost:8000 to open the web app.

## How To Use The App

The interface of the app is very simple. It will only require the user to modify the quantity of the different batteries shown. At the bottom of the page is the summary of the configurations which will be updated as changes are done.

To modify the quantity of each battery, the user can enter a number directly into the input box or just select the box and use the up and down arrow to increase or decrease the quantity.

## How It Works

The application is broken down in two parts: the frontend and the backend. Due to the simplicity of the requirements, the site doesn’t really need a backend side but it was included as a way to show how the list of devices can be requested via an API endpoint and that list can be maintained in the backend  if at some point a requirement to allow the list to be dynamic would be added(DB component was not added due to time restriction and to reduce complexity).

The coding was done using Javascript/Typescript on all components.

### Frontend

It uses a Node.js base with libraries to run a React application. The project skeleton was created using the Vite tool. Typescript was also used to help with type definition and validation during development.

### Backend

It uses Node.js in combination with the Express framework to set up an API endpoint (http://localhost:3000/devices). 



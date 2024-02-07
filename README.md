# Project Title

ExploreLocal Web Application

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database](#database)
- [Git SCM Guide](#git-scm-guide)

## Project Description

"ExploreLocal"- a dynamic web application designed to connect users with valuable insights about nearby businesses that are worth exploring. Imagine a digital hub where users can effortlessly discover information about local business, ranging from charming boutiques and historical establishments to serene countryside retreats and recommended culinary hotspots.

## Technologies Used

- [Express.js](https://expressjs.com/): A fast, unopinionated, and minimalist web framework for Node.js.
- [EJS](https://ejs.co/): Embedded JavaScript templates for generating dynamic HTML.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): The programming language used for server-side logic.
- [SQLite](https://www.sqlite.org/): A self-contained, serverless, and zero-configuration SQL database engine.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm: [Install Node.js and npm](https://nodejs.org/)
- SQLite (Recommended for local development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ella13162/WebApp-Assignment.git
  ```

2. Navigate to the project directory:

```bash
cd explorelocal
```

3. Install the required npm packages:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000` to view the application.


## Usage

This API allows users to interact with the "ExploreLocal" database.

Lookup Local Businesses: To view businesses in a specific region, use `/businesses/:region (GET)`. Replace `:region` with the desired region name.

Add a New Business: Send a `POST` request to `/businesses` with the business details (name, type, country, region, longitude, latitude, description) in JSON format.

Recommend a Business: To increment recommendations for a business, send a `PUT` request to `/businesses/recommend/:id`, replacing :id with the business's ID.

## Features

- Look up activities in a specified region.
- Add new experiences to the database.
- Interactive map display of experiences using Leaflet and OpenStreetMap.
- User authentication system for login and session management.
- Capability to add recommendation only for authenticated users.

## Testing

For testing the API endpoints, you can use tools like RESTer or Rest Client extention which can be downloaded on VS Code.

Example Routes are available in the folder rotes.rest:

```bash
# see all businesses
###
GET http://localhost:3000/localbusiness
# see businesses located in Southampton
###
GET http://localhost:3000/localbusiness/Southampton

# add a new business with json 
###
POST http://localhost:3000/localbusiness/add
Content-Type: application/json

{
    "name" : "Wawel",
    "type" : "Castle", 
    "country" : "Poland", 
    "region" : "Krakow", 
    "lon" : 50.05, 
    "lat" : 19.93,
    "description" : "Castle built in 13th and 14th Centuries", 
    "recommendations" : 0
}

# check the new added business
###
GET http://localhost:3000/localbusiness/Krakow

# or searching by name
###
GET http://localhost:3000/localbusiness/Wawel

## add recommendations where id number for new added business Wawel Castle in Krakow is 352
###
POST http://localhost:3000/localbusiness/recommend/352

# delete duplicated new added business
###
DELETE http://localhost:3000/localbusiness/353

# checking if the result search is only one:
###
GET http://localhost:3000/localbusiness/krakow

```

## Built With

- [Node.js](https://nodejs.org/) - The runtime server environment.
- [Express](https://expressjs.com/) - The web application framework.
- [SQLite](https://www.sqlite.org/) - The database engine.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ella13162/WebApp-Assignment.git).

## Authors

- **Elzbieta Strzyz** - *Explore Local Web Application* - [ella13162](https://github.com/ella13162/WebApp-Assignment.git)

## Git SCM Guide

## Git Scm tool
please install git scm command line tool from the link below

[Git SCM Tool](https://git-scm.com/)

# Steps for Github
1. Install Git Hub tool
2. Creat a git hub repository 
   1. Select Public/Private
   2. Select the .gitignore -- "Use appropriate Language e.g. NodeJS"
   3. You might select licence
3. check the git version using
   > git -v
4. Copy the contents of the github newly created rep .gitignore file and create a new .gitignore file locally and past it in the file
5. Add a Readme.md file locally as well
6. Initialise the existing folder as a new github repo/proj
   > git init
7. Add the exisitng file and folders and git command will ignore the files mentioned in .gitignore file
   > git add .
        or 
   > git add -A
        or
   > git add "filename"
8. Note: you can get the help of a available git commands using 
   > git help
9. Check the branch if it's **main** or **master**. The old github use to create the **master** branch but now it's the **main** branch which is default brach.
10. If you tool created a **master** branch then change/update it to **main** brach using the command below
    > -- check the branch 
    > git branch // Shows all available branches
    > git branch -a // Shows active brance

    Change from master to main branch
      > git branch -m main
11. Add the remote github to the ""origin". Go and copy the path of your github repo where you want to push all your files/folder 
    > git remote add origin https://github.com/ella13162/WebApp-Assignment.git

    You can confirm the remote origin by using command
    >git remote add origin https://github.com/ella13162/WebApp-Assignment.git
12. If you don't have any existing project and you want to **clone** existing project from github you can clone it like
    > git clone "Path of you github rep.git"
13. Add commit or comment
    > git commit -m "initial commit"
14. Check the status which file/folder will be added to remote repo
    > git status
15. Push all your files/folder to the Github
    > git push -u -f origin "name of your branch"

    e.g.
    > git push -u -f origin main // use this command for the first time

    if you already pushed your repo then use the simple push command
    > git push origin main

## Summary of Github Command
### clone existing project
    > git clone https://github.com/ella13162/WebApp-Assignment.git
### Steps for making existing folder as repo
> git init
> git branch -m main
> git add .
> git commit -m "Initial Commit"
> git remote add origin "link to your repository"
> git push -u -f origin main // First time
> git push origin main    


# Git Pull command for Collobaration project
> git pull "path to the repo" https://github.com/ella13162/WebApp-Assignment.git
> 
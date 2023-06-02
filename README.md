# Journal App 
A responsive single page application allowing registered users to create and use personal journals. Registered users can peform all CRUD operations when it comes to their journals and the journal entries within them. This app is built with the MERN stack - Mongo/Express/React/Node. Second version of an application initially done with [Vue](https://github.com/rpashev/vue-journal-app/#readme)

Here you can find the **[REST API](https://github.com/rpashev/journal-app-REST)** that I have built for the app.    
> Live demo **[HERE](https://my-journal-app-react.netlify.app/)**

## Table of Contents
* [General Info](#general-information)
* [Challenges](#challenges)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
Journaling is an interest of mine so I was very keen on creating an app that I am passionate about while improving my web development skills. CRUD operations are essential for most web applications and I had a great opportunity to practice implementing these features in this single page application. It was an amazing learning experience to work on connecting the React front end with the Express/Mongo [Backend](https://github.com/rpashev/rest-movie-apps) and making every feature work with error handling. Especially interesting was to consume the same [REST api](https://github.com/rpashev/rest-movie-apps) as in the previous [Vue version](https://github.com/rpashev/vue-journal-app/#readme) but this time using React for the frontend.


## Challenges
- previously having worked with TypeScript mostly in the context of Angular, it took a while to get used to using TS with React
- going around some of Material UI's limitations was difficult at times
- first time I've used react-query so it was a challenging but also very interesting experience
- react-quill's configuration took a while
- coming up with a design and making the journal entries table responsive was challenging


## Technologies Used  

### Front End
- React 18.2.0
- React Router 6.10.0
- TypeScript
- Material UI
- Context API
- React-Query
- React-Quill
- Axios
  
 ### Back End
 - Node
 - Express 
 - MongoDB
 - Mongo Atlas
 - Mongoose
 - JWT
 - Axios


## Features
### Anonymous users are able to:
- register
- login

### Authenticated users are able to:
- create multiple journals
- edit a journal's name and description
- delete a journal
- view their journals
- view a single journal with its entries
- create a journal entry with a text editor
- edit a journal entry
- delete a journal entry
- view a journal entry
- filter entries by date
- filter for the amount of entries showing on a page
- search entries by title/content
- logout


## Setup
### To get a local copy up and running follow these simple steps:

1. Make sure you have **`node`** and **`npm`** installed globally on your machine.  

2. Clone the repo  
    ### `git clone https://github.com/rpashev/react-journal-app.git`  

3. Install NPM packages  
    ### `npm install`    
  
4. Run the app in development mode with hot reloading  
    ### `npm start`  

5. You can view the app on [http://localhost:3000](http://localhost:3000)  
 
6. To build for production run the following command  
    ### `npm run build`
    
7. If you want to connect to the backend follow the instructions [here](https://github.com/rpashev/journal-app-REST/#readme)


## Room for Improvement
- implement an "Auto Logout" functionality on JWT expiration
- implement custom filter by date for the journal entries
- refactor some of the more repetitive code on the front end by implementing hooks when appropriate
- break up some of the larger components
- implement a backend pagination for the journal entries
- implement a feature that allows users to add images to their entries


## Contact
Created by rpashev - feel free to [contact me](https://www.rpashev.com/).

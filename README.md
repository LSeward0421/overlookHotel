# Overlook

## Abstract
- Overlook is a hotel management application that allows customers to manage their room bookings and view their total spending on rooms. It uses OOP and an API to retrieve and add data, and includes a test suite for client-side functionality. Customers can log in with their credentials and view a dashboard page that shows them any past or upcoming room bookings, as well as the total amount they have spent on rooms. They can select a date for which they’d like to book a room, filter available rooms by their room type, and book a room for themselves. If no rooms are available, they will be prompted to adjust their search.


#### Goals and Objectives

- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application
- Ensure the application is accessible for all users

## Technologies
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Preview
![overlookGif](https://user-images.githubusercontent.com/114787710/223546414-0785b0fb-96dd-4293-bcfd-045a139f37a5.gif)


## Features
- Login for multiple users
- Available rooms searchable by date and room type
- All user bookings shown on home page with total spent
- 100% accessibility score on Lighthouse and app is fully tabbable

## Possible Future Extensions
- Complete Manager class interactions to view a customers bookings, then add and remove bookings
- Display daily revenue streams and occupation percentages by date
- Logout button feature

#### Milestones
- Successfully working with different endpoints to fetch and manipulate data
- Outside of a few issues with attaching event listeners, I did not have to reach out for help nearly as much as I thought I would. 

#### Challenges 
- Understanding asychronosity with APIs
- Building out classes before really understanding the data. Once data was retrieved, it took some manipulating of the types of data to be formatted correctly. 

## Set Up
1. Clone the repo
2. Enter the directory and install NPM packages
   ```sh
   npm install
   npm start
   ``` 
3. Clone the local API repo 
   ```sh
   git clone git@github.com:turingschool-examples/overlook-api.git
   ```
4. Enter the API directory and start the local server
   ```sh
   npm install
   npm start
   ```
5. Enter the following url in your browser: http://localhost:8080/
6. Explore the website

## Sources
  - [MDN](http://developer.mozilla.org/en-US/)
  - [YouTube](https://www.youtube.com/)
  - [Canva](https://www.canva.com/)

## Contributors
  - [Lauren Seward](https://github.com/LSeward0421)

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/overlook.html)

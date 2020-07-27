# Mapping App Prototype

A Reusable React Component for General 2D Mapping

## Table of Contents

* [Live Demo](#live-demo)
* [Installation](#installation)
* [What is the project for?](#what-is-the-project-for)
* [Technologies](#technologies)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Live Demo

<https://crud-mapbox-example.jonathanengelbert.com/> 

This demo uses another [mapping framework I developed](<https://github.com/jonathanengelbert/postgis-webserver-template>)
 to stand up a Node/Express/PostGIS webserver.

### Installation

In the future, this module will be available as a npm package.
For now, clone repository and install locally using npm:

`$ git clone https://github.com/jonathanengelbert/mapping-app-prototype.git`
<br>
`$ cd mapping-app-prototype && npm install`
<br>

Add a mapbox token to .env
<br>

`$ npm start`

### What is the project for?

The goal of this project is to serve as a template for general 2D mapping that can be ported into any web application.
<br>
At the very least, once finished this project provides:

* A Mapbox canvas ready to consume data from local or remote source

* Map controls component contained within the Map canvas for navigation

* Contain a component that displays data added to map as list of elements ( as in a drop down, for example)

* Modularity and high configurability for all the aforementioned elements within the code and/or UI

### Technologies 

* Typescript ^3.7.5 
* React ^16.13.1
* Material UI ^4.9.11
* Mapbox GL ^1.9.0 
* Node-Sass ^4.13.1

And sub-dependencies of these modules

### Contributing

There are currently no set guidelines on how to contribute to this project, but contributions are welcome.
Please reach out to the author of this project directly at <jonathanengelbert@gmail.com>

### Authors

* Jonathan Engelbert

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

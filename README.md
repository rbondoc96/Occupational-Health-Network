<!-- <p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>
 -->
 <p align="center">
  <img src="https://raw.githubusercontent.com/rbondoc96/Clinic-Locator-and-Database/bcd29ad2c5a8cfb3cfb4b3b06aa2ed25ca7e7433/frontend/src/assets/nav-main-logo.svg">
</p>
<h1 align="center">Occupational Health Network</h1>

<p align="left">
Occupational Health Network is a community-supported network of information on medical clinics that offer occupational health services. Patients and employers are able to track clinics they visit or interact with and help others who are seeking services.
</p>
<ul>
  <li>
    Track information such as <b>services provided</b>, <b>contact</b>, <b>business hours</b>, and <b>contact information</b>, etc.
  </li>
  <li>
    Search for nearby clinics in the network and filter based on services needed, business hours, etc.
  </li>
  <li>
    Post patient or employer reviews for others to sees
  </li>
</ul>

## Table of Contents
---
- [Disclaimer](#disclaimer)
- [Installation](#install)
- [Usage](#usage)
- [Project Background](#proj-bg)

## Disclaimer <a name = "disclaimer"></a>
---
I am not a medical professional. All content on this application should not be regarded as professional medical advice. This platform is purely for informational purposes to help find the best possible clinic for the user's needs.

Users should talk to their doctor or their employer for information on the services they're interested in.

## Installation <a name = "install"></a>
---
This project runs on following technologies:
In addition to the following technologies, this project also uses the Node.js version of <a href="https://www.npmjs.com/package/foreman" target="_blank">Foreman</a> to build the static frontend files and run the Django server at the same time.

<h4>Front End</h4>
<ul>
  <li>HTML5</li>
  <li>SCSS</li>
  <li>ES6 JavaScript</li>
  <li>Node.js v12.18.0</li>
  <li>npm v6.14.4</li>
  <li>Webpack 4</li>
</ul>

<h4>Back End</h4>
<ul>
  <li>Python 3.8.2</li>
  <li>Django 3.1</li>
  <li>pipenv v2018.11.26</li>
  <li>PostgreSQL</li>
</ul>

<h4>Configuring PostGreSQL</h4>

In the settings.py file, configure the DATABASES dictionary to interface with your PostgreSQL database. For example,

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cldb',
        'USER': 'postgres',
        'PASSWORD': 'somepassword123',
        'HOST': '127.0.0.1',
        'PORT': '5432'
    }
}
```

<h4>Configuring Backend</h4>

In the repo root directory, create a new virtual environment with <b>pipenv</b> and install the Python project dependencies:

```
pipenv shell    # Initialize the virtual environment
pipenv install  # Install Python dependencies
```

After installation, move into the Django project directory <b>/cldb/</b> and run the following command to migrate the database models to Postgres:

```
python manage.py migrate
```

If you want to use the database with test data I'm using for development, use <b>pgAdmin4</b> to restore the database from one of the files in <b>/test_db/</b>

<h4>Configuring Frontend</h4>

From the repo root directory, move into the <b>/frontend/</b> directory and run the following command:

```
npm install
```

## Usage <a name = "usage"></a>
---

<h4>Running Foreman</h4>

From the <b>/frontend/</b> directory (where the Procfile) is, run the following command to build the frontend using Webpack4 into Django's static directory, and run the Django server:

```
nf start
```

<h4>API</h4>
The API endpoints for the server can be found at <b>localhost:[port_num]/api/</b>

By default, all users can view reviews and locations on the network. In order to add locations, give reviews, and bookmark locations, users must register.

## Project Background <a name = "proj-bg"></a>
----
I originally came up with this project as a means to rework a location finder tool used at my current job to locate medical clinics. From an employer POV, I felt that our team was wasting a lot of time independently calling the same clinics asking for the same things, and had no efficient way of sharing the information with each other. 

This project was aimed to originally reduce the number of calls made to medical clinics, thereby reducing effort for both the employer and the clinic personnel. Now, it has been expanded to be a network open to everyone, and help patients and employers everywhere in the U.S. in finding the best clinic for their needs.
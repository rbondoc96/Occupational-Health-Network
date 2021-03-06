 <p align="center">
  <img src="https://raw.githubusercontent.com/rbondoc96/Clinic-Locator-and-Database/bcd29ad2c5a8cfb3cfb4b3b06aa2ed25ca7e7433/frontend/src/assets/nav-main-logo.svg">
</p>
<h1 align="center">Occupational Health Network</h1>

<p align="left">
Occupational Health Network is a community-supported network of information on medical clinics that offer occupational health services. Patients and employers are able to track clinics they visit or interact with and help others who are seeking services.
</p>
<ul>
  <li>
    Track information such as <b>services provided</b>, <b>contacts</b>, <b>business hours</b>, <b>businesss information</b>, etc.
  </li>
  <li>
    Search for nearby clinics in the network and filter based on services needed, business hours, etc.
  </li>
  <li>
    Post patient or employer reviews for others to see
  </li>
</ul>

## Table of Contents
- [Disclaimer](#disclaimer)
- [UI Design](#ui)
- [Installation](#install)
- [Usage](#usage)

## Disclaimer <a name = "disclaimer"></a>
I am not a medical professional. All content on this application should not be regarded as professional medical advice. This platform is purely for informational purposes to help find the best possible clinic for the user's needs.

Users should talk to their doctor or their employer for information on the services they're interested in.

## User Interface Design <a name = "ui"></a>
To see my (in progress) designs on the app views, visit my <a href="https://www.figma.com/file/mh7KX4NzE33gT9OcMpvzYV/OCH-Net">Figma project page.</a>

## Installation <a name = "install"></a>
In addition to the following technologies, this project also uses the Node.js version of <a href="https://www.npmjs.com/package/foreman" target="_blank">Foreman</a> to build the static frontend files and run the Django server at the same time.

<h4>Front End</h4>
<ul>
  <li>HTML5</li>
  <li>SCSS</li>
  <li>ES6 JavaScript</li>
  <li>Node.js v12.18.0</li>
  <li>npm v6.14.4</li>
  <li>Webpack 4</li>
  <li>Nodemon</li>
</ul>

<h4>Back End</h4>
<ul>
  <li>Python 3.8.2</li>
  <li>Django 3.1</li>
  <li>pipenv v2018.11.26</li>
  <li>PostgreSQL 12.2</li>
</ul>

<h4>Configuring PostgreSQL</h4>

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

<h4>Configuring the Backend</h4>

In the repo root directory, create a new virtual environment with <b>pipenv</b> and install the Python project dependencies:

```
pipenv shell    # Initialize the virtual environment
pipenv install  # Install Python dependencies
```

After installation, move into the Django project directory <b>/cldb/</b> and run the following command to migrate the database models to Postgres:

```
python manage.py migrate
```

<h4>Configuring the Frontend</h4>

From the repo root directory, move into the <b>/frontend/</b> directory and run the following command:

```
npm install
```

## Usage <a name = "usage"></a>

<h4>Running Foreman</h4>

From the <b>/frontend/</b> directory (where the Procfile) is, run the following command to build the frontend using Webpack4 into Django's static directory, and run the Django server:

```
nf start
# Runs:
#   npm run build
#   python ../cldb/manage.py runserver
```

Nodemon is used in conjunction with Foreman to monitor any changes in the src/ files and will rebuild the front end if there are any changes.

<h4>API</h4>
The API endpoints for the server can be found at <b>localhost:[port_num]/api/</b>

By default, all users can view reviews and locations on the network. In order to add locations, give reviews, and bookmark locations, users must register.

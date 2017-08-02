ESFiddle
===

[![Build Status](https://travis-ci.org/esfiddle/esfiddle.png?branch=master)](https://travis-ci.org/esfiddle/esfiddle) 
[![Join the chat at https://gitter.im/esfiddle/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/esfiddle/Lobby)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)

Try out the latest ES6+ features right in your browser.

See it online [here](https://esfiddle.net/).

Getting Started
------------
*This guide assumes you already have MongoDB and NodeJS installed. Click [here](/docs/HOW_TO_INSTALL_NODEJS_AND_MONGODB.md) for instructions on how to install MongoDB and NodeJS*

Clone the repository
```bash
# Get the latest version
git clone git@github.com:esfiddle/esfiddle.git

# Change directory
cd esfiddle

# Update PRIVATE section in sample.env file and rename it to '.env'
mv sample.env .env

# Open a new terminal window and start MongoDB
mongod --dbpath path/to/your/db/folder

# Install the dependencies 
npm i

# Start the application
npm start
```

Found a bug?
------------
Read the [Help I've Found a Bug](/docs/REPORTBUG.md) article and follow its instructions.

Want to know what we are working on?
------------
Check out our [vision](/docs/VISION.md).

Contributing
------------
We welcome pull requests from first-timers and seasoned veteran programmers alike. Follow the steps above to get setup.

In addition to this we are looking for maintainers. Please come and chat with us in our [gitter](https://gitter.im/esfiddle/Lobby) if you are interested.

Please first review the [Code of Conduct](/docs/CODE_OF_CONDUCT.md) and the [Contributing guide](/docs/CONTRIBUTE.md) to help you get setup. Our [Style Guide](/docs/AirbnbStyleGuide/README.md) is based on the [Airbnb style guide](https://github.com/airbnb/javascript).

Then have a look at some of the [projects issues](https://github.com/esfiddle/esfiddle/issues) Checkout the labels [first-timers-only](https://github.com/esfiddle/esfiddle/labels/first-timers-only), [bite-size](https://github.com/esfiddle/esfiddle/labels/bite-size) (for small issues) and [up-for-grabs](https://github.com/esfiddle/esfiddle/labels/up-for-grabs).

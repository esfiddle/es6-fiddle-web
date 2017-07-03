# Frequently Asked Questions

## What does ES in ESFiddle stand for?
It stands for ECMAScript - the language on which Javascript is based off of. When the TC39 (Technical Committee 39) ,who manage what goes into the language of ECMAScript, introduce a new feature to the language, it is the job of the browser makers to implement it. Because this takes time and can vary across browsers we created ESFiddle to try out these new features before they are implemented in the browser.

## How does ESFiddle work?
It takes your code that you write on ESFiddle and runs it through the babel transpile library to convert that to Javascript that your browser can run.

## Who makes ESFiddle?
These amazing people. We work entirely online through github. You can see the repository here. You can even come and chat with us here. We come from all over the world in places like Brazil, Portugal, England, US and India.

## Cool! Can I help?
Absolutely, we'd love to have you on board! Check out issues board and look for any that take your fancy. Or if you want to suggest and feature/bug fix then create a new issue and we will take a look into it.

## I just ran 'npm start' and  got a bunch of errors

First, make sure you have node installed. Run `node -v` and if you get an error in return, go to [this document](/docs/HOW_TO_INSTALL_NODEJS_AND_MONGODB.md) and follow the instructions. 

With this taken care of, you need to run `npm install` from within the directory where your ESfiddle's `package.json` file is. This step is needed to install all required dependencies for ESFiddle to work.

## So, I ran `npm start` but I see something other then ESFiddle in the browser

Make sure you're not running any other servers at the same port. For example, Express uses port 3000 (http://localhost:3000) by default, and if you've got an Express application running in the background with default settings, you will see this other website instead of ESfiddle. Terminate this other app, and try again, should work now! 

## I've got some `MongoError` messages and ESFiddle doesn't load

Let's first make sure you have MongoDB set up on your machine locally or somewhere in the cloud. If a `mongo --version` command doesn't yield a result one might expect, please refer to [this manual](/docs/HOW_TO_INSTALL_NODEJS_AND_MONGODB.md) for information regarding your particular system. With MongoDB installed, proceed to the next step.

Now, this is probably just a little thing: a failed connection to the database. In order to fix this, you need to point MongoDB in the direction where your database is. Usually, you'd do this by launching `mongod --dbpath path/to/your/db/folder`. For example, for a Mac machine with MongoDB installed via Homebrew, this command would look like this: `mongod --dbpath /usr/local/var/mongodb`. 

Using MongoDB locally is not a requirement. If you have experience with hosted databases such as MLab, for example, by all means feel free to use your `mongodb://` URL as your path to the database. For your convenience, there's a sample.env file with this variable ready for your custom URL. NB: Don't forget to rename `sample.env` file to just `.env`

 - ### My Mongo url is 'undefined:27017' and fails to start the server
![errorImage](https://user-images.githubusercontent.com/16874651/27354460-134cf2a2-5621-11e7-8b97-c9e5f826656e.png)

This can be fixed by ensuring that your `.env` is configured correctly. Please take a look at the `sample.env`, make a copy, change any details and rename it to `.env`. Making sure there is a file called `.env` or the server will not be able to find your enviroment variables.

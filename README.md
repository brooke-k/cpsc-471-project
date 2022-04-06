# CPSC 471 - Database Management - Group Project
Group project for CPSC-471 Database Management

## Installing Frontend Dependencies

1. Ensure npm version >=8.3.0 is installed on your machine. If it is not, follow the instructions found on [the official npm website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). You may also need to install Node.js, if you haven't done so previously. 

2. Install yarn on your machine by following the instructions found [on yarn's offical website](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)Note that this project was built using yarn version 1.22.17, so the legacy instructions are required. Following the instructions for yarn version >=2.0 *will not allow you to run the frontend.* 
> ***Only follow legacy instructions using npm.***

3. Navigate to cpsc-471-project/frontend/ and run the command `yarn install`. If you haven't done this yet, it will read the existing *yarn.lock* file and install all the required dependencies automatically. It may take some time if this is your first time running the command. Be patient. 

4. Follow the instructions in the section below to operate the development server

## Running the Server

*If you have not already installed the frontend dependencies (found in the previous section), you will need to do so before proceeding.*

1. Navigate to the directory `cpsc-471-project/frontend`

2. In your command line, run the frontend server with the command `yarn run dev` . A live-reloading server hosting the website will be opened at `http://localhost:8080`.
> *Please note that if you have "only HTTPS" set as a security protocol in your browser, you will not be able to access the development server without turning this setting off first.*

3. The server can be shut down with `CTRL+C` or the equivalent command for your command line. To restart the server, repeat the above steps. 

### Please Note: These instructions were written using commands for a `zsh` terminal with `xTerm` compatibility. It is recommened that MacOS users utilize the appriate `zsh` terminal and that windows users use a WSL Linux backend.

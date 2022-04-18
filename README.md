# CPSC 471 - Database Management - Group Project
Group project for CPSC-471 Database Management

**Group 14**
*Code written by Brooke Kindleman*

## Installing Dependencies
### Installing Frontend Dependencies

1. Ensure npm version >=8.3.0 is installed on your machine. If it is not, follow the instructions found on [the official npm website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). You may also need to install Node.js, if you haven't done so previously.

2. Install yarn on your machine by following the instructions found [on yarn's offical website](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)Note that this project was built using yarn version 1.22.17, so the legacy instructions are required. Following the instructions for yarn version >=2.0 *will not allow you to run the frontend.*
> ***Only follow legacy instructions using npm.***

3. Navigate to cpsc-471-project/frontend/ and run the command `yarn install`. If you haven't done this yet, it will read the existing *yarn.lock* file and install all the required dependencies automatically. It may take some time if this is your first time running the command. Be patient.

### Installing the Backend Dependencies

1. Ensure Python version 3.8.10 and pip verison 22.0.4 are installed on the local machine. Please note, the following instructions will not work on Python version >=3.10.x, so it is important that this version of Python is installed.

2. Navigate to cpsc-471-project/backend and run the command `pip install -r requirements.txt` to automatically install dependencies. Please note that manual installation may be needed for some dependencies if they do not automatically install, but this is unlikely.


## Running the Program

Copy the contents of `.env` (found at the bottom of the README) into a file called `.env` and place it in `cpsc-471-project/`. Attempting to run the program without it will fail. Please ensure that http://127.0.0.1:3003 and  http://127.0.0.1:8000 are open on your computer prior to running the program.

Correct operation of the system will require both the frontend and the backend to be run at the same time. It is advisable to do this in two terminals, or by using another method that will allow them to run seperately.

Once the following instructions have been followed for running the front and backend, the program can be accessed at http://127.0.0.1:8000 in the web browser.

### Running the Frontend

*If you have not already installed the frontend dependencies (found in the previous section), you will need to do so before proceeding.*

1. Navigate to the directory `cpsc-471-project/frontend/`

2. In your command line, run the frontend server with the command `yarn run dev` . A live-reloading server hosting the website will be opened at `http://localhost:8080`.
> *Please note that if you have "only HTTPS" set as a security protocol in your browser, you will not be able to access the development server without turning this setting off first.*

3. The server can be shut down with `CTRL+C` or the equivalent command for your command line. To restart the server, repeat the above steps.

### Running the Backend

*If you have not already installed the backend dependencies (found in the previous section), you will need to do so before proceeding.*

1. Navigate to the directory `cpsc-471-project/backend/`

2. Run the command `python3 main.py` or `python main.py`. The functionality may vary on your system, but on will run correctly upon startup.

3. The server can be shut down with `CTRL+C` or the equivalent command for your command line. To restart the server, repeat the above steps.

### Please Note: These instructions were written using commands for a `zsh` terminal with `xTerm` compatibility. It is recommened that MacOS users utilize the appriate `zsh` terminal and that windows users use a WSL Linux backend.

### `.env` Contents

```
MONGODB_URL = 'mongodb+srv://allergy-manager-admin:epinephrine-benadryl@cpsc-471-g14.lsui9.mongodb.net/allergy-manager?retryWrites=true&w=majority'
MONGODB_PORT = '3003'
MONGODB_DATBASE_NAME = 'allergy-manager'

ENV=development
PORT=8000
BASE_API_URL=http://localhost:3003
PUBLIC_URL=http://localhost:8000
BASE_WEBSITE_URL=http://localhost:8000
```
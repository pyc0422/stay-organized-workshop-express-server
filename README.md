# Stay Organized ToDo List Web Appliation
Welcome to the Stay Organized Todo List Web Application! This web app allows users to manage their tasks efficiently, explore other users' tasks, and filter tasks based on various criteria. Below, you'll find instructions on how to get started, how to use the application, and information about its features.

## Pages:
- Homepage
    - Dynamic render different button on navbar based on wether user logged in or not
    - Add welecome message for logged in user
    - Always display the log in form

    <img width="600px" alt="Screenshot 2024-05-15 at 11 41 17 AM" src="https://github.com/pyc0422/stay-organized-workshop-express-server/assets/86500068/e47672e1-4854-4c2a-a69b-beb4a12952f7">

- Tasks page
    - Default to display the logged in users tasks
    - 3 filters will dynamic render task data based on users selections
    - By toggling checkbox on each card to mark the task to be completed or not
    - By clicking the delete icon on each card can delete the task

    <img width="600px" alt="Screenshot 2024-05-15 at 11 41 49 AM" src="https://github.com/pyc0422/stay-organized-workshop-express-server/assets/86500068/09e84796-cd76-4266-878e-5cb12cd73df3">   

- New user page
    - A register form

    <img width="600px" alt="Screenshot 2024-05-15 at 11 42 05 AM" src="https://github.com/pyc0422/stay-organized-workshop-express-server/assets/86500068/caad4f95-1688-4242-a32a-bd33d88a388a">

- New Task Page
    - Allows user to add new task for any of the users

     <img width="600px" alt="Screenshot 2024-05-15 at 11 42 33 AM" src="https://github.com/pyc0422/stay-organized-workshop-express-server/assets/86500068/ced0797b-4d87-40fe-af5c-6dca76eb707e">

      
## Features
- User Authentication:
    - Users can login on the homepage
    - Dyanmica rendered Navbar for logged in users and non-log in users
    - Logout button and welcome message alwasy show for logged in users
-  View the Tasks:
    - Default to display the logged in users tasks
    - Dynamic rendered filter section based on wether user has tasks or not
    - Dynamic render different color for different priorities
        -  Red for high, Orange for Medium, Green for Low
    - Get Categories from server and render it with different background color
- Filter the Tasks:
    -  Allows the users to select different user name to view their tasks
    -  Applied 3 filters for the tasks, user can combine all of them
        -  By Priority
        -  By Category
        -  By Status
- Manage the Tasks:
    - Toggle the checkbox to mark the task as completed or not
    - Click the Delete Icon will popup a window to confirm if the users want to delete the tasks or not
 
## Tech Stacks
<b>JavaScript, HTML, TailwindCss, Css, Node.js</b>

### Other libraries:
  Express, Nodemon, Bcrpty, Sweatalert2
  
## Getting Started
This section will discuss how to get the Stay Organized server up and running locally

- Verify Node.js is installed by running the following command.
  
  **Command to run**
  ```bash
    node -v
  ```
  **Sample Output**
  ```bash
    v14.15.4     (or something similar)
  ```

  > **Note:** If you do not have Node.js installed, you can install the LTS (Long-term Support) version from here: https://nodejs.org/en/

- Clone this repository to your local computer.

  ```bash
    git clone https://github.com/DevelopIntelligenceBoulder/stay-organized-workshop-express-server
  ```

- Change directories (`cd`) into the newly cloned project folder.

  ```bash
    cd stay-organized-workshop-express-server
  ```

- Install the projects dependencies with NPM (Node Package Manager).
  
  ```bash
    npm install
  ```

- Start the local server

  **Command to start the server**
  ```bash
    npm start
  ```

  **Expected Output**
  ```bash
    App listening at port 3000
  ```


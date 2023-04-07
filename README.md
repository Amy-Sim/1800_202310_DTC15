# Project Title

LiftBuddy - the carpooling app that is only accessible to internal employees or students

## 1. Project Description

This browser based web application to serve transportation service to users in severe weather conditions, like snowstorms. floods, or extreme heat. Our app, LiftBuddy is a carpooling platform that is only accessible to internal employees or students specific to their workplace or school. LiftBuddy will help commuters to get to work or school in times of extreme weather.

## 2. Names of Contributors

* Amy Sim
* Corey McTavish
* Fiona Wong

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- Weather API 

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...

- Ask team members where they have left off in their coding. 
- Follow commented code lines to see where the team member left off. 
- Read the html files first then start looking at the JS file. 

To start using our project, users should follow these steps: 
    1. Clone the project repository.
    2. Install necessary dependancies listed in source files. (do we have one?? would install a proper term?)
    3. User should set up his/her own firebase along with Authentication and Cloud Firestore.
    4. Use the provided scripts and commands to run the project.
    5. User may modify source code as appropriate for the desired use case. 
    6. If encountering issues or errors, consult the project documentation or seek assistance from the project team.  

## 5. Known Bugs and Limitations

Here are some known bugs:

- Repeating history entry
- Icon and text in navbar is not center 
- Footer is different size in different screens

## 6. Features for Future

What we'd like to build in the future:

- Editable profile picture in account settings 
- Nicer UI design through the app
- Hovering colours for navbar's icons

## 7. Contents of Folder

Content of the project folder:

```
 Top level of project folder:
├── .gitignore                       # Git ignore file
├── .firebaserc                
├── firebase.json                
├── firebase.index.json                
├── firebase.rules                
├── README.md
├── index.html                       # landing HTML file, this is what users see when you come to url
├── login.html
├── main.html

It has the following subfolders and files:
├── .git                            # Folder for git repo
├── images                          # Folder for images
    /abstract_blue.jpg
    /bigBtnMap.png
    /bigbtnwithmap.png
    /buddyup.png
    /buddyup1.png
    /buddyup3.png
    /connections_bg.jpeg
    /darkblue_grid_bg.jpeg
    /liftbuddy_logo.png
    /profile_image.png
    /weatherbanner.jpg
├── scripts                         # Folder for scripts
    /account_profile.js
    /account_settings.js
    /authentication.js
    /buddy_preferences.js
    /favourites.js
    /firebaseAPI_LiftBuddyDTC15.js  # Not available in this repo
    /history.js
    /main.js
    /map.js
    /script.js
    /skeleton.js
    /weather_update.js
├── styles                          # Folder for styles
    /style_blue.css
    /style_.css
├── text                             # Folder for html_pages
    /404.html
    /back_button.html
    /footer.html
    /nav_after_login.html
    /nav_before_login.html
├── html_pages                      # Secondd folder for html_pages
    /about_us.html
    /account_profile.html
    /account_settings.html
    /buddy_preferences.html
    /favorites.html
    /history.html
    /home.html
    /map.html
    /resources.html
    /weather.html
├── page_templates
    /default_layout.html
    /empty_page_no_header.html
├── resource_articles
    ├── article1
        /extreme_heat.png
    ├── article2
        /stress.jpeg
    /cat.jpeg
    /hand.jpeg
    /yogasun.jpeg

```
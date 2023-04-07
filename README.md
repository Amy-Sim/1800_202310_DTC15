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
- Google Material Icons 

## 4. Complete setup/installion/usage

Setup and Installation
To start using our project, users should follow these steps: 
    1. Clone the project repository.
    2. Install necessary dependancies listed in source files. 
    3. User should set up their own firebase along with Authentication and Cloud Firestore.
    4. Use the provided scripts and commands to run the project.
    5. User may modify source code as appropriate for the desired use case. 
    6. If encountering issues or errors, consult the project documentation or seek assistance from the project team.  

Usage
To use our application, please visit https://comp1800-202310dtc15.web.app/
    1. Sign up with your workplace or school institution email or sign in if you have an account with us already.
    2. Click "Account" to personalize your settings.
    3. Click "Home" to buddy up. Initinalize the pairing protocol.
    4. Select the driver or passagener that you want to be pair up.
    5. Click "History" to view previous drivers/passengers.
    6. Click the star icon if you want to favourite a driver/passenger.
    7. Click "Favourites" bookmarked buddies will show up.
    8. Click weather banner, to check the weather
    9. Cick on "Resources", for articales relating to mental health. 


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
├── .gitignore                       # Git ignore file for git repo
├── .firebaserc                      # Chooses the Firebase project to be used for hosting.
├── firebase.json                    # Specifies which files should be used for hosting.  
├── firebase.index.json              # Defines indexes for the Cloud Firestore database in Firebase
├── firebase.rules                   # Defines firestore rules           
├── README.md                        # Readme file
├── index.html                       # Landing HTML file, this is what users see when you come to url
├── login.html                       # Login page
└── main.html                        # Welcome page after login

Subfolders and files:
├── .git                            # Folder for git repo

├── images                          # Folder for images
    /abstract_blue.jpg              # General background image    
    /buddyup3.png                   # Big button image
    /connections_bg.jpeg            # Background image for login page
    /liftbuddy_logo.png             # Logo of liftbuddy
    /profile_image.png              # Profile image
    /weatherbanner.jpg              # Background image for weather page

├── scripts                         # Folder for scripts
    /account_profile.js             # User account profile function
    /account_settings.js            # User account setting function 
    /authentication.js              # User authentication function
    /buddy_preferences.js           # Buddy preference setting function
    /favourites.js                  # Favourites function 
    /firebaseAPI_LiftBuddyDTC15.js  # Firebase API - Not available in this repo
    /history.js                     # History function 
    /main.js                        # Function for main page that displays welcome message
    /map.js                         # Map function with MAPBOX
    /skeleton.js                    # Load nav, footer, header function
    /weather_update.js              # Weather reporting function

├── styles                          # Folder for styles
    /style_blue.css                 # Style for background
    /style_.css                     # General style

├── text                            # Folder for html_pages
    /404.html                       # File not found page 
    /back_button.html               # Back button
    /footer.html                    # Footer
    /nav_after_login.html           # nav bar after login
    /nav_before_login.html          # nav bar before login

├── html_pages                      # Secondd folder for html_pages
    /about_us.html                  # About us page                  
    /account_profile.html           # Account profile page
    /account_settings.html          # Account setting page
    /buddy_preferences.html         # Buddy prefereneces page
    /favorites.html                 # Favorites page
    /history.html                   # History page
    /home.html                      # Home page
    /map.html                       # Map page
    /resources.html                 # Resources page
    /weather.html                   # Weather page

├── page_templates                  # Folder for html templates
    /default_layout.html            # Default layout page
    /empty_page_no_header.html      # Empty page without header

├── resource_articles               # Folder for resource article references
    ├── article1                    # Folder for article 1
        /extreme_heat.png           # Image for extreme heat
    ├── article2                    # Folder for article 2
        /stress.jpeg                # Image for stress
    /cat.jpeg                       # Cat image
    /hand.jpeg                      # Hand image
    /yogasun.jpeg                   # Yoga image

```
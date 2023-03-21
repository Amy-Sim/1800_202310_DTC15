function showMap(
  currentUser,
  currentUserDepartmentPreferences,
  currentUserGenderPreferences,
  currentUserGender,
  currentUserDepartment,
  currentUserType
) 

{
  // Defines basic mapbox data
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";
  const map = new mapboxgl.Map({
    container: "map", // Container ID
    style: "mapbox://styles/mapbox/streets-v11", // Styling URL
    center: [-122.964274, 49.236082], // Starting position
    zoom: 8, // Starting zoom
  });

  // (amy) listener function for the sending-requests
  firebase
    .firestore()
    .collection("requests")
    .where("requestedId", "==", firebase.auth().currentUser.uid)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        // add your code here to handle the carpooling request
      });
    });

  const requestsRef = firebase.firestore().collection("requests");

  // (amy) replace 'requestedUserId' with the actual ID of the user you're requesting a ride from
  requestsRef
    .add({
      requesterId: firebase.auth().currentUser.uid,
      requestedId: "requestedUserId",
      status: "pending",
    })
    .then(() => {
      console.log("Request sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending request:", error);
    });

  function handleBuddyUpClick() {
    // Get user input
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Add request to Firestore
    const requestsRef = db.collection("requests");
    requestsRef
      .add({
        requesterId: uid,
        requestedId: buddyId,
        status: "pending",
        destination: destination,
        date: date,
        time: time,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        // Call function to show success message
        showSuccessMessage();
        // Add button disabled state
        buddyUpButton.disabled = true;
        // Add button text
        buddyUpButton.innerText = "Request Sent";
        // Add button class
        buddyUpButton.classList.add("disabled");
        // Add button tooltip
        buddyUpButton.title = "Request already sent";
        // Add button icon
        buddyUpButton.innerHTML = '<i class="fas fa-paper-plane"></i>';

        // Call function to show notification popup
        showNotificationPopup(docRef.id, buddyId);

        // Get a reference to the requested user's document in Firestore
        const requestedUserDocRef = db.collection("users").doc(requestedUserId);

        // Update the requested user's document with the alert field set to the current user's ID
        requestedUserDocRef
          .update({
            alert: currentUser.uid,
          })
          .then(() => {
            console.log("Alert field updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating alert field:", error);
          });
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  firebase
    .firestore()
    .collection("users")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().buddyParings === "changed") {
          console.log("Accept");
        }
      });
    });


  // Add user controls to map
  map.addControl(new mapboxgl.NavigationControl());

  // Adds map features
  map.on("load", () => {
    // Defines map pin icon for events
    map.loadImage(
      "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("eventpin", image); // Pin Icon

        // READING information from "events" collection in Firestore
        db.collection("users")
          .get()
          .then((allEvents) => {
            const features = []; // Defines an empty array for information to be added to
            allEvents.forEach((doc) => {
              let ID = doc.id;
              console.log(ID);
              lat = doc.data().lat;
              lng = doc.data().lng;
              console.log(lat, lng);
              coordinates = [lng, lat];
              console.log(coordinates);
              user_name = doc.data().name; // User Name
              gender = doc.data().gender; // User Gender
              department = doc.data().department; // User Department
              type = doc.data().type;
              genderPreference = doc.data().genderPreference;
              departmentPreference = doc.data().departmentPreference;
              console.log(
                genderPreference,
                departmentPreference,
                gender,
                department
              );
              console.log(
                currentUserGenderPreferences,
                currentUserDepartmentPreferences,
                currentUserGender,
                currentUserDepartment
              );
              // (corey) added a control structure to account for the current user's preferences and each user's preferences
              if (ID != currentUser.uid && currentUserType != type) {
                if (
                  currentUserGender == gender &&
                  currentUserDepartment == department
                ) {
                  // Pushes information into the features array
                  features.push({
                    type: "Feature",
                    properties: {
                      description: `<strong>${user_name}</strong>
                                    <p>Gender: ${gender}</p> 
                                    <p>Department: ${department}</p> 
                                    <p>I am a: ${type}</p>
                                    <button id="BuddyUp">Ask to BuddyUp</button>`,
                    },
                    geometry: {
                      type: "Point",
                      coordinates: coordinates,
                    },
                  });
                } else if (
                  currentUserGender == gender &&
                  currentUserDepartment != department
                ) {
                  if (
                    currentUserDepartmentPreferences == false &&
                    departmentPreference == false
                  ) {
                    // Pushes information into the features array
                    features.push({
                      type: "Feature",
                      properties: {
                        description: `<strong>${user_name}</strong>
                                      <p>Gender: ${gender}</p> 
                                      <p>Department: ${department}</p> 
                                      <p>I am a: ${type}</p>
                                      <button id="BuddyUp">Ask to BuddyUp</button>`,
                      },
                      geometry: {
                        type: "Point",
                        coordinates: coordinates,
                      },
                    });
                  }
                } else if (
                  currentUserGender != gender &&
                  currentUserDepartment != department
                ) {
                  if (
                    currentUserDepartmentPreferences == false &&
                    departmentPreference == false &&
                    currentUserGenderPreferences == false &&
                    genderPreference == false
                  ) {
                    // Pushes information into the features array
                    features.push({
                      type: "Feature",
                      properties: {
                        description: `<strong>${user_name}</strong>
                                      <p>Gender: ${gender}</p> 
                                      <p>Department: ${department}</p> 
                                      <p>I am a: ${type}</p>
                                      <button id="BuddyUp">Ask to BuddyUp</button>`,
                      },
                      geometry: {
                        type: "Point",
                        coordinates: coordinates,
                      },
                    });
                  }
                } else if (
                  currentUserGender != gender &&
                  currentUserDepartment == department
                ) {
                  if (
                    currentUserGenderPreferences == false &&
                    genderPreference == false
                  ) {
                    // Pushes information into the features array
                    features.push({
                      type: "Feature",
                      properties: {
                        description: `<strong>${user_name}</strong>
                                      <p>Gender: ${gender}</p> 
                                      <p>Department: ${department}</p> 
                                      <p>I am a: ${type}</p>
                                      <button id="BuddyUp">Ask to BuddyUp</button>`,
                      },
                      geometry: {
                        type: "Point",
                        coordinates: coordinates,
                      },
                    });
                  }
                }
              }
            });
            // Adds features as a source to the map
            map.addSource("places", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: features,
              },
            });
            // Creates a layer above the map displaying the pins
            map.addLayer({
              id: "places",
              type: "symbol",
              // source: 'places',
              source: "places",
              layout: {
                "icon-image": "eventpin", // Pin Icon
                "icon-size": 0.1, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });
            // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
            map.on("click", "places", (e) => {
              // Copy coordinates array.
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;
              // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "places", () => {
              map.getCanvas().style.cursor = "pointer";
            });
            // Defaults cursor when not hovering over the places layer
            map.on("mouseleave", "places", () => {
              map.getCanvas().style.cursor = "";
            });
          });
      }
    );

    // Add the image to the map style.
    map.loadImage(
      "https://cdn-icons-png.flaticon.com/512/61/61168.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style with width and height values
        map.addImage("userpin", image, { width: 10, height: 10 });

        // Adds user's current location as a source to the map
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          console.log(userLocation);
          if (userLocation) {
            map.addSource("userLocation", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: userLocation,
                    },
                    properties: {
                      description: "Your location",
                    },
                  },
                ],
              },
            });

            // Creates a layer above the map displaying the user's location
            map.addLayer({
              id: "userLocation",
              type: "symbol",
              source: "userLocation",
              layout: {
                "icon-image": "userpin", // Pin Icon
                "icon-size": 0.05, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });

            // Map On Click function that creates a popup displaying the user's location
            map.on("click", "userLocation", (e) => {
              // Copy coordinates array.
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the userLocation layer.
            map.on("mouseenter", "userLocation", () => {
              map.getCanvas().style.cursor = "pointer";
            });

            // Defaults
            // Defaults cursor when not hovering over the userLocation layer
            map.on("mouseleave", "userLocation", () => {
              map.getCanvas().style.cursor = "";
            });
          }
        });
      }
    );
  });
}

// Save the user's location to Firestore
function storeUserLocation(user) {
  latitude = navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("This is my coords: " + lat + " " + lng);
    db.collection("users").doc(user.uid).update({
      lat,
      lng,
    });
  });
}

$(document).ready(function () {
  // (Amy's code) Add the button onclick eent funciion here:

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            var departmentPreferences = doc.data().departmentPreference;
            var genderPreferences = doc.data().genderPreference;
            var gender = doc.data().gender;
            var department = doc.data().department;
            var type = doc.data().type;
            console.log(
              genderPreferences,
              departmentPreferences,
              gender,
              department,
              type
            );
            storeUserLocation(user);
            showMap(
              user,
              departmentPreferences,
              genderPreferences,
              gender,
              department,
              type
            );
          }
        });
    }
  });
  // Call the function to display the map with the user's location and event pins
});

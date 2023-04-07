function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

			// Get the Array of bookmarks
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);
						
			// Get pointer the new card template
            let newcardTemplate = document.getElementById("favoritesCardTemplate");

			// Iterate through the ARRAY of bookmarked users (document ID's)
            bookmarks.forEach(thisUserID => {
                console.log(thisUserID);
                db.collection("users").doc(thisUserID).get().then(doc => {
                    var name = doc.data().name; // gets the name field
                    var department = doc.data().department; //gets the department field
                    var gender = doc.data().gender; //gets the gender field
                    
                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update name and some pertinant information
                    newcard.querySelector('#buddy-name').innerHTML = name;
                    newcard.querySelector('#buddy-department').innerHTML = department;
                    newcard.querySelector('#buddy-gender').innerHTML = gender;
					//Finally, attach this new card to the gallery
                    favouritesCardGroup.appendChild(newcard);
                })
            });
        })
}
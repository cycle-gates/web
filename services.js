const firebaseConfig = {
    apiKey: "AIzaSyBfqmCuHwOTIsjvHJSgPGuhkHiJzH9d-vk",
    authDomain: "cycle-gates.firebaseapp.com",
    projectId: "cycle-gates",
    storageBucket: "cycle-gates.appspot.com",
    messagingSenderId: "241947311511",
    appId: "1:241947311511:web:215066c2a554f61d4998d2",
    measurementId: "G-X5VP7TTVTV"
};

firebase.initializeApp(firebaseConfig);

// document.getElementById("contactForm").addEventListener("button", readEmailFromUsersCollection);

function createPaymentRequest(subprofile) {
    const priceEGP = "100";
    var userId = document.getElementById("name").value;

    return new Promise(function (resolve, reject) {

        firebase.firestore().collection("transactions").add({
            firstName: subprofile.Firstname,
            lastName: subprofile.Lastname,
            priceEGP: priceEGP,
            emailAddress: "test@test.com",
            phoneNumber: "00000000000",
            paymentType: "Credit Card",
            type:1,
            uId:userId
        })
            .then(function (docRef) {
                setTimeout(function () {
                    docRef.get().then(function (docSnapshot) {
                        resolve(docSnapshot.data());
                    }).catch(function (error) {
                        reject(error);
                    });
                }, 5000);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                reject(error);
            });
    }).then(function (documentData) {
        console.log("Created document data: ", documentData);
        var paymentLink = documentData.paymentLink;
        // Open the payment link in a new popup window
        var popup = window.open(paymentLink, "_blank", "width=800,height=600");
        if (popup) {
            // Popup window opened successfully
            // Perform any additional actions if needed
        } else {
            // Popup window blocked by the browser
            // Handle the scenario where the popup window is blocked
        }
    })
        .catch(function (error) {
            console.error("Error creating payment request: ", error);
            // Handle the error as needed
        });

}

function paymentRequest() {
    checkUserData() .then(function(subprofile) {
        if (subprofile) {
          console.log("Subprofile: ", subprofile);
          createPaymentRequest(subprofile);
          
          // Handle the subprofile object as needed
        } else {
          console.log("No matching subprofile found.");
          swal({  text: "Make sure user id correct",
          title: "User Not Found!",

            icon: "error",
            buttons: ["Stop"],

          });
        }
      })
}

function checkUserData() {

    var userId = document.getElementById("name").value;
    var db = firebase.firestore();

    // Query the "Subprofile" collection group
    var query = db.collectionGroup("Subprofile").where("Uid", "==", userId).limit(1);
  
    // Get the matching document
    return query.get()
      .then(function(querySnapshot) {
        if (!querySnapshot.empty) {
          var doc = querySnapshot.docs[0];
  
          // Get the "Firstname" and "Lastname" fields from the document
          var firstname = doc.get("Firstname");
          var lastname = doc.get("Lastname");
  
          // Create an object with the retrieved fields
          var subprofile = {
            Firstname: firstname,
            Lastname: lastname
          };
  
          // Return the subprofile object
          return subprofile;
        } else {
          return null; // No matching document found
        }
      })  
      .catch(function(error) {
        console.error("Error getting subprofile: ", error);
        throw error;
      });

}



        // firebase.firestore().collection("users").doc("cbz8HOpLNKXSbxC9Ru9XbxvKBkP2").get().then(function (docRef) {
        //     setTimeout(function () {
        //         docRef.get().then(function (docSnapshot) {
        //             resolve(docSnapshot.data());
        //         }).catch(function (error) {
        //             reject(error);
        //         });
        //     }, 5000);
        // })})    .then(function (documentData) {
        //     console.log("Created document data: ", documentData);
        //     // var paymentLink = documentData.paymentLink;
        //     // Open the payment link in a new popup window
        //     // var popup = window.open(paymentLink, "_blank", "width=800,height=600");
        //     // if (popup) {
        //     //     // Popup window opened successfully
        //     //     // Perform any additional actions if needed
        //     // } else {
        //     //     // Popup window blocked by the browser
        //     //     // Handle the scenario where the popup window is blocked
        //     // }
        // })
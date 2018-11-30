const functions = require('firebase-functions');
var fetch = require('node-fetch')



const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);





//send the push notification 
exports.sendPushNotification = functions.database.ref('notifyText/{id}').onCreate( (change, context) => {


    var messages = []
    if (change != null){
    
    const body = change.val().name
    console.log('push notification has triggered from ' + context.params.id + body)
    //return the main promise 
    return admin.database().ref().child('tokens/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            
            var expoToken = childSnapshot.val().token;

            console.log('Token: ' + expoToken)

            messages.push({
                "to": expoToken,
                "title": "Reunion Lake",
                "body": body
            });
        });
        //firebase.database then() respved a single promise that resolves
        //once all the messages have been resolved 
        return Promise.all(messages)

    })
        .then(messages => {
            console.log('message sent'+JSON.stringify(messages))
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)
            });
        })
        .catch(reason => {
            console.log(reason)
        })
    }

});


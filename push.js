// var webPush = require('C:/Users/nguing/AppData/Roaming/npm/node_modules/web-push');
var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BNyER_qUATgcl0zTg737Sw903_53bG4KwF_kS6Pc1_TvyTqDFCfbF0V9iNt5hcrmKIGPTq459hU6h6MIsacpKF8",
    "privateKey": "X68x_6z6TOqafgJAD88Okmqd2t7e2F2N8Wb3rjd67UA"
};
 
 
webPush.setVapidDetails(
    'mailto:de.deff.deffry@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f1A4AhrteNM:APA91bHmEc9Bu5oQa156GiM8lRg8TeabrgMJOsAow4vLGY8XETY1mwcI2kDHh90dgRsEwR2-75HHrLRryWNPdv0EViDix4kvXAAok7jRzICB6w3Rl6oWnnUkvMOIM9zKXqtOmk2C0Q9o",
    "keys": {
        "p256dh": "BJPUG8LY3uuMuOCUQPHnw/BNYFgMJwAojDUwqUg+P6McvkCOR1ei9QPS02e7CPpkbodgalBBvY4WnbqIx99lGkU=",
        "auth": "+fzBqXJ69UJAlw2i3XiwkQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '489407451958',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
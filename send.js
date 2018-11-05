var FCM = require('fcm-push');
var serverkey = 'AAAANyAD_kY:APA91bHlh42hsFdRQYzBOLKThb9sp3hZA7hEV5lFog4rk-xO-8TsJSTgWVOyyfROr4orHtvbQp1RZv27OV74_xy7P2OuQTL9ZEjKXtrR54o-dKN9KrPt2Zljkl04i1OMuvvsTJ1_0635';
var fcm = new FCM(serverkey);
var mysql = require('mysql');
var _ = require('underscore');

let getDeviceDataFromDb = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(` SELECT * from tb_device `, (err, data) => {
                    if (err) reject(err);
                    console.log(data);
                    return resolve(data);
                });

        } catch (error) {
            console.log(error);
            return error;
        }
    })

}

module.exports = {
    sendPush: async function () {
        const data = await getDeviceDataFromDb();
        console.log("data------------->", data);
        let deviceToken = _.pluck(data, 'device_token');
        console.log("deviceToken---------->", deviceToken);
        const chunks = _.chunk(deviceToken, 1000);
        console.log("chunks------>", chunks);
        var message = {
                notification: {
                    title: 'Push Notification Send',
                    body:  "Notification Send Successfully"
                },
            };
        const promises = _.map(chunks, (e) => {
            message.registration_ids = e;
            return sendBulkPushNotification(message);
        });
        return Promise.all(promises);
    }
};


function sendBulkPushNotification(message) { // eslint-disable-line no-unused-vars
        console.log("sdfyui",message);
        fcm.send(message, function(err,response){ 
            if(err) {
            console.log("Something has gone wrong !", err);
            } else {
            console.log("Successfully sent with resposne :",response);
            return {statusCode : 200,
                ResponseMessage :"Push Sent Successfully",
            data: response};
            }
            });            
}
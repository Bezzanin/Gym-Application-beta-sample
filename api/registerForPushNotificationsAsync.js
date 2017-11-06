import { Platform } from 'react-native';
import { Permissions, Notifications } from 'expo';
import Database from '../api/database';

// Example server, implemented in Rails: https://git.io/vKHKv
const PUSH_ENDPOINT = 'https://exponent-push-server.herokuapp.com/tokens';

export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  let uid = null
  Database.getUID((user) => {
    uid = user.uid
  })
  setTimeout(() => {
   Database.addPushToken(uid, token)
  }, 3000);
  
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log(uid, token)
  // Database.addPushToken(token)
  // POST the token to our backend so we can use it to send pushes from there
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
});

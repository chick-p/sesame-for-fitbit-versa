import * as messaging from 'messaging';
import * as sesame from './sesame';

const WAIT_RESPONSE_SEC = 5;

// Send the todoist data to the device
const sendMessageToDevice = (message): void => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(message);
  } else {
    console.log('Error: Connection is not open');
  }
};

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt): void => {
  if (!evt.data) {
    return;
  }
  const command = evt.data.command;
  if (command === 'prepare' || command === 'status') {
    sesame.fetchSesameStatusWithWait(WAIT_RESPONSE_SEC).then((resp) => {
      sendMessageToDevice(resp);
    }).catch((err) => {
      console.log(`Fetch status error: ${err}`);
    });
  } else if (command === 'unlock' || command === 'lock') {
    sesame.postControlSesame(command).then(() => {
      return sesame.fetchSesameStatusWithWait(WAIT_RESPONSE_SEC);
    }).then((resp) => {
      sendMessageToDevice(resp);
    }).catch((err) => {
      console.log(`Control sesame err: ${err}`);
    });;
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = (err): void => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
};

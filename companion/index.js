import * as messaging from 'messaging';
import * as sesame from './sesame';

// Send the todoist data to the device
const sendDataToDevice = (data) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log('Error: Connection is not open');
  }
};

// Execute API
const exec = (url, method, data) => {
  const options = {};
  options.method = method;
  options.headers = {};
  options.headers['Authorization'] = sesame.token;
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  return fetch(url, options)
    .then(resp => {
      resp.json().then(json => {
        sendDataToDevice(json);
        return json;
      });
    })
    .catch(err => {
      console.log('Error fetch sesame: ' + err);
    });
};

const status = (waitSec) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(exec(sesame.sesameUrl, 'GET', null));
    }, waitSec * 1000);
  });
};

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt) => {
  if (!evt.data) {
    return;
  }
  if (evt.data.command === 'prepare') {
    status(5);
  } else if (evt.data.command === 'status') {
    exec(sesame.sesameUrl, 'GET', null);
  } else if (evt.data.command === 'unlock') {
    const data = {command: 'unlock'};
    exec(sesame.sesameUrl, 'POST', data);
    status(8);
  } else if (evt.data.command === 'lock') {
    const data = {command: 'lock'};
    exec(sesame.sesameUrl, 'POST', data);
    status(8);
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = (err) => {
  console.log('Connection error: ' + err.code + ' - ' + err.message);
};

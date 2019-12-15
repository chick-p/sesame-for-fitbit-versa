import * as messaging from 'messaging';
import * as sesame from './sesame';

type option = {
  method: string;
  headers: {
    'Authorization': string;
    'Content-Type'?: string;
  };
  body?: string;
}

// Send the todoist data to the device
const sendDataToDevice = (data): void => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log('Error: Connection is not open');
  }
};

// Execute API
const exec = (url, method, data): Promise<string> => {
  const options: option = {
    method: method,
    headers: {'Authorization': sesame.token},
  }
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  return fetch(url, options).then(resp => {
    return resp.json();
  }).then(json => {
    sendDataToDevice(json);
    return json;
  }).catch(err => {
    console.log('Error fetch sesame: ' + err);
  });
};

const status = (waitSec): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(exec(sesame.sesameUrl, 'GET', null));
    }, waitSec * 1000);
  });
};

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt): void => {
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
messaging.peerSocket.onerror = (err): void => {
  console.log('Connection error: ' + err.code + ' - ' + err.message);
};

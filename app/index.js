import document from 'document';
import * as messaging from 'messaging';
import {display} from 'display';

const statusImg = document.getElementById('status-image');
const statusText = document.getElementById('status-text');
const btnUnlock = document.getElementById('btn-unlock');
const btnLock = document.getElementById('btn-lock');
const btnCheck = document.getElementById('btn-check');

btnCheck.onactivate = function(evt) {
  statusText.text = 'Checking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'status'});
};

btnUnlock.onactivate = function(evt) {
  statusText.text = 'Unlocking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'unlock'});
};

btnLock.onactivate = function(evt) {
  statusText.text = 'Locking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'lock'});
};

const enabledAllButton = function(isEnabled) {
  if (isEnabled) {
    btnCheck.enable();
    btnLock.enable();
    btnUnlock.enable();
  } else {
    btnCheck.disable();
    btnLock.disable();
    btnUnlock.disable();
  }
};

// Request number of today's task from the companion
const fetchStatus = function() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({command: 'prepare'});
  }
};

messaging.peerSocket.onopen = () => {
  fetchStatus();
};

// Listen for messages from the companion
messaging.peerSocket.onmessage = evt => {
  if (evt.data['task_id']) {
    return;
  } else if (evt.data['locked']) {
    statusText.text = 'Locked';
    statusImg.image = 'images/status-lock.png';
    enabledAllButton(true);
  } else {
    statusText.text = 'Unlocked';
    statusImg.image = 'images/status-unlock.png';
    enabledAllButton(true);
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = err => {
  // Handle any errors
  console.log('Connection error: ' + err.code + ' - ' + err.message);
};

statusText.text = 'Preparing...';
statusImg.image = 'images/status-prepare.png';
enabledAllButton(false);
display.autoOff = false;

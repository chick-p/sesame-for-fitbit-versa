import document from 'document';
import * as messaging from 'messaging';
import {display} from 'display';

const statusImg = document.getElementById('status-image') as ImageElement;
const statusText = document.getElementById('status-text');
const btnUnlock = document.getElementById('btn-unlock') as ComboButton;
const btnLock = document.getElementById('btn-lock') as ComboButton;
const btnCheck = document.getElementById('btn-check') as ComboButton;

const enabledAllButton = (isEnabled: boolean): void => {
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

statusText.text = 'Preparing...';
statusImg.href = 'images/status-prepare.png';
enabledAllButton(false);
display.autoOff = false;

btnCheck.onactivate = (): void => {
  statusText.text = 'Checking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'status'});
};

btnUnlock.onactivate = (): void => {
  statusText.text = 'Unlocking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'unlock'});
};

btnLock.onactivate = (): void => {
  statusText.text = 'Locking...';
  enabledAllButton(false);
  messaging.peerSocket.send({command: 'lock'});
};

// Request number of today's task from the companion
const prepareSesame = (): void => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({command: 'prepare'});
  }
};

messaging.peerSocket.onopen = (): void => {
  prepareSesame();
};

// Listen for messages from the companion
messaging.peerSocket.onmessage = (evt): void => {
  if (!evt.data) {
    return;
  } else if (evt.data.isLocked) {
    statusText.text = 'Locked';
    statusImg.href = 'images/status-lock.png';
    enabledAllButton(true);
  } else {
    statusText.text = 'Unlocked';
    statusImg.href = 'images/status-unlock.png';
    enabledAllButton(true);
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = (err): void => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
};

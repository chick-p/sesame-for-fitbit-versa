// Please replace your Sesame auth token
const token = '{YOUR-SESAME-AUTH-TOKEN}';
// Please replace your Sesame device ID
const deviceId = '{YOUR-SESAME-DEVICE-ID}';

export const url = `https://api.candyhouse.co/public/sesame/${deviceId}`;

type SesameResponse = {
  isLocked?: boolean;
  taskId?: string;
}

export function fetchSesameStatus(): Promise<SesameResponse> {
  const options = {
    method: 'GET',
    headers: {'Authorization': token}
  };
  return new Promise(function(resolve, reject) {
    return fetch(url, options).then((resp) => {
      return resp.json();
    }).then((json) => {
      resolve({isLocked: json.locked});
    }).catch((err) => {
      reject(err);
    });
  });
}

export function fetchSesameStatusWithWait(waitSec: number): Promise<SesameResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fetchSesameStatus());
    }, waitSec * 1000);
  });
};

export function postControlSesame(command: string): Promise<SesameResponse> {
  const body = {
    command: command
  };
  const options = {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return new Promise(function(resolve, reject) {
    return fetch(url, options).then((resp) => {
      return resp.json();
    }).then((json) => {
      resolve({taskId: json.task_id});
    }).catch((err) => {
      reject(err);
    });
  });
}


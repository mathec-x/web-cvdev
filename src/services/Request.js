export const Host = process.env.REACT_APP_API_URL;
/**
 * @type {<Method extends "get"|"post"|"put"|"delete"|"upload">(
 *    method: Method,
 *    uri: string,
 *    body?: Method extends "upload" ? FileList : Object,
 *    headers?: {}) => Promise<Response>}
 */
export const Request = (method, uri, body, headers = {}) => {
  const modifiedheader = {};

  const token = sessionStorage.getItem('x-access-token');
  if (token) {
    modifiedheader['x-access-token'] = token;
  }

  const socketId = sessionStorage.getItem('socket-id');
  if (socketId) {
    modifiedheader['socket-id'] = socketId;
  }

  const subscription = sessionStorage.getItem('subscription');
  if (subscription) {
    modifiedheader['subscription'] = subscription;
  }

  if (method.toLocaleLowerCase() === 'upload') {
    if (!body || body.length === 0)
      return Reject()
    let data = new FormData()
    for (const file of body) {
      data.append('file', file, file.name)
    }
    return fetch(Host + uri, {
      method: 'post',
      body: data,
      headers: { ...modifiedheader }
    })
  }

  return fetch(Host + uri, {
    method: method.toUpperCase(),
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Econding': 'gzip',
      ...headers,
      ...modifiedheader
    },
  });
};

export const Reject = (err = 'Canceled') => {
  return new Promise((_, rej) => rej(err));
}
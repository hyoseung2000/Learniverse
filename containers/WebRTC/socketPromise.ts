import { Socket } from 'socket.io-client';

// Adds support for Promise to socket.io-client
const socketPromise = (socket: typeof Socket) => {
  return function request(type: string, data = {}) {
    return new Promise((resolve) => {
      socket.emit(type, data, resolve);
    });
  };
};

export default socketPromise;

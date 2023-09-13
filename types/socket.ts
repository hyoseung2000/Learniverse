import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';
import { NextApiResponse } from 'next/types';
import { Server as SocketIOServer } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket<DefaultEventsMap, DefaultEventsMap>;

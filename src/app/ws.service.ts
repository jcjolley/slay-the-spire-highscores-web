import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'
@Injectable({
  providedIn: 'root'
})
export class WsService {
  // this subject queues as necessary to ensure every message is delivered
  input = new QueueingSubject<string>();
  messages;
  connectionStatus;
  private url;

  constructor() {
    if (location.href.includes('localhost')) {
      this.url = 'ws://localhost:3003';
    } else {
      this.url = 'ws://jcjolley.com:3003';
    }
  }

  // this method returns an object which contains two observables
  public connect() {
    if (!this.messages) {
      const { messages, connectionStatus } = websocketConnect(this.url, this.input);
      this.messages = messages;
      this.connectionStatus = connectionStatus;
    }
    return this.messages;
  }
}

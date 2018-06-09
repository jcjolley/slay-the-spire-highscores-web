import { Component, OnInit, ViewChild } from '@angular/core';
import { WsService } from '../ws.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.styl'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message = '';
  @ViewChild('scrollMe') scrollMe;
  constructor(private socket: WsService, private authService: AuthService) { }


  ngOnInit() {
    this.socket.connect().subscribe(x => {
      console.log('Recieved: ', x);
      if (this.messages.length > 9) {
        this.messages = this.messages.slice(-9);
      }
      this.messages.push(JSON.parse(x));
      this.onScroll();
    });
  }

  sendMessage(input) {
    const message = {
      username: this.authService.username,
      message: input,
      time: Date.now()
    };
    this.socket.input.next(JSON.stringify(message));
    this.message = '';
  }

  onScroll() {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (e) {
      console.error(e);
    }
  }
}

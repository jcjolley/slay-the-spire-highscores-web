import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  sendErrorMessage(e, msg?) {
    Swal('Error', msg, 'error');
    console.error(e);
  }
}

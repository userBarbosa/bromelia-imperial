import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../../models/Utils';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  // The $ at the end of the variable name is a naming convention to indicate that the variable holds an observable.
  toast$ = this.toastSubject.asObservable();

  showToast(type: 'success' | 'error' | 'info' = 'info', title: string, text: string) {
    const toast: Toast = { title, text, type };
    this.toastSubject.next(toast);
  }
}

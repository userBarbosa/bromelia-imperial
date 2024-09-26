import { Component } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Toast } from '../../models/Utils';
import { ConfigurationService } from '../../services/config/configuration.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.less',
})
export class ToastComponent {
  toasts: Toast[] = [];

  constructor(
    private toastService: ToastService,
    private cs: ConfigurationService
  ) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(
        () => this.removeToast(toast),
        this.cs.TOAST_DURATION_SECONDS * 1000
      );
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}

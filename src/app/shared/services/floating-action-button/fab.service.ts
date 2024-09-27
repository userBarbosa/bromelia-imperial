import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FABService {
  private options: Array<{ icon: string; label: string; route: string }> = [];

  setOptions(options: Array<{ icon: string; label: string; route: string }>) {
    this.options = options;
  }

  clearOptions() {
    this.options = [];
  }

  getOptions() {
    return this.options;
  }
}

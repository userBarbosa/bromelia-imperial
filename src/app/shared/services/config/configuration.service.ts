import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}

  readonly TOAST_DURATION_SECONDS = 15;

  // readonly BASE_URL = 'http://localhost:3000/api';
  
  // DEV:
  readonly BASE_URL = 'http://localhost:4000';
}

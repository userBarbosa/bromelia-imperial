'use strict'

export interface Toast {
  title: string;
  text: string;
  type: 'success' | 'error' | 'info';
}
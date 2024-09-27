'use strict'

export type Contact = {
  id: string;
  name: string;
  address?: string;
  phone: string;
  email: string;
  groupId: string;
};

export type ContactResponse = {
  error?: { [key: string]: any };
  data?: Contact;
  success: boolean;
};
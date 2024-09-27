'use strict';

import { Contact } from './Contact';

export type Group = {
  id: string;
  name: string;
  description: string;
  members: Member[];
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;
  active?: boolean;
};

export type Member = {
  userId: string;
  isAdmin: boolean;
};

export type GroupContactsResponse = {
  error?: { [key: string]: any };
  data?: { contacts: Contact[] };
  success: boolean;
};

export type GroupsResponse = {
  error?: { [key: string]: any };
  data?: Group[];
  success: boolean;
};

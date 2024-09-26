'use strict'

export type Group = {
  id: string;
  name: string;
  description: string;
  members: Member[];
  createdBy: string;
  updatedBy: string;
  createdAt: string | Date,
  updatedAt: string | Date,
  deletedAt?: string | Date,
  active?: boolean,
};

export type Member = {
  userId: string;
  isAdmin: boolean;
};

export type UserType = {
  id: number;
  name: string;
  description: string;
  avatarLink: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserType = {
  name: string;
  description: string;
  avatarLink: string;
};

export type DeleteUserType = {
  id: number;
};

export type UpdateUserType = {
  id: number;
  name: string;
  description: string;
  avatarLink: string;
};

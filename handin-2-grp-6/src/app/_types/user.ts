export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId?: number;
  accountType: 'Client' | 'PersonalTrainer';
}

export type PostUserDto = Omit<User, 'userId'>;

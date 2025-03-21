/**
 * Represents a user in the system
 * @interface
 */
export interface IUser {
  id: number;
  username: string;
  email: string;
  isDeleted: boolean;
  role?: {
    id: string;
    name: string;
  };
  permissions?: {
    id: string;
    name: string;
    apiPath: string;
    module: string;
  }[];
}

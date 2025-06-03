export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface FormErrors {
  [key: string]: string;
}
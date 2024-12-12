export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "ORGANIZER";
};

export type RegisterResponse = {
  message: string;
  success: boolean;
  data: {
    id: number;
    email: string;
  };
};

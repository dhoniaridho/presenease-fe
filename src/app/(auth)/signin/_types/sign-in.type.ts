import { ResponseSuccess, ResponseError } from "@/types/api/response.type";

export type SignInPayloadType = {
  email: string;
  password: string;
};

export type SignInSuccessType = ResponseSuccess<{
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}>;

export type SignInErrorType = ResponseError;

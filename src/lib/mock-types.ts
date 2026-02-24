export type ApiErrorCode = "UNAUTHORIZED" | "BAD_REQUEST" | "NOT_FOUND";

export type ApiSuccess<T> = {
  status: "ok";
  data: T;
  error: null;
};

export type ApiFailure = {
  status: "error";
  data: null;
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type GeneratedPost = {
  id: string;
  topic: string;
  style: string;
  length: number;
  language: string;
  content: string;
  state: "generated" | "publishing" | "published" | "failed";
  createdAt: string;
};

export type PublishedPost = {
  publishId: string;
  sourceId: string;
  platform: string;
  url: string;
  state: "published";
  publishedAt: string;
};

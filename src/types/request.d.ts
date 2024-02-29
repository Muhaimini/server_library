declare module "@client/request" {
  interface RequiredData {
    id: string;
  }

  interface RequiredPayload<T = unknown> {
    id: string;
    value: T;
  }

  interface DeleteByPK {
    id: string;
  }
}

declare module "@client/response" {}

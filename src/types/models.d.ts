declare module "models" {
  import { USER_TYPE } from "./index";

  interface OptionalPayload {
    id?: string;
  }

  interface UserProfile extends OptionalPayload {
    identityId: string;
    name: string;
    address: string;
    contact: string;
    type: USER_TYPE;
  }
  interface Book extends OptionalPayload {
    isbn: string;
    title: string;
    author: string;
    genreId: string;
    publishedAt: Date;
    quantity?: number;
    totalBorrowed?: number;
    genre?: Genre;
  }

  interface Genre extends OptionalPayload {
    label: string;
  }

  interface Borrower extends OptionalPayload {
    userProfileId: string;
    bookId: string;
    returnDate?: Date | null;
    maximumReturnAt?: Date | null;
  }
}

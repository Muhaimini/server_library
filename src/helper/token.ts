import jwt from "jsonwebtoken";

const SECRET_KEY = "library-secret-key-7c95f902-67fc-4fa6-9771-d6603a9be5de";

export const onGenerateToken = <T extends object>(props: T) => {
  try {
    if (!props) return "";
    return jwt.sign(props, SECRET_KEY, { expiresIn: "7d" });
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const onDecodeToken = <T = unknown>(token: string) => {
  try {
    if (!token) return;
    return jwt.verify(token, SECRET_KEY) as T;
  } catch (error) {
    console.log(error);
    return;
  }
};

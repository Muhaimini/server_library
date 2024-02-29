import { isEmpty, every } from "lodash";
import { USER_TYPE } from "../types";

export const isValidPayload = <T extends object = {}>(props: T) => {
  if (isEmpty(props)) return false;

  return every<T>(props, (value) => !isEmpty(value));
};

export const onValidateUserType = (userType: USER_TYPE) => {
  if (isEmpty(userType)) return USER_TYPE.MEMBER;

  return userType === USER_TYPE.LIBRARIAN ? userType : USER_TYPE.MEMBER;
};

export const jsonResponse = ({ response, message = "OK!" }: JSONResponse) => ({
  data: response,
  message,
});

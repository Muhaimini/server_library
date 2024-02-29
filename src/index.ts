import { onInitializeApp } from "./config";
import {
  userProfilesRouter,
  borrowerRouter,
  booksRouter,
  genreRouter,
  loginRouter,
} from "./routes/v1";

onInitializeApp({
  onSuccess: (_, app) => {
    app.use("/v1", userProfilesRouter);
    app.use("/v1", borrowerRouter);
    app.use("/v1", booksRouter);
    app.use("/v1", genreRouter);
    app.use("/v1", loginRouter);

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`-> Server is running on port ${process.env.SERVER_PORT}`);
      console.log("-> Connected to our database");
    });
  },
  onError: (error) => console.log("Sequelize connection error: ", error),
});

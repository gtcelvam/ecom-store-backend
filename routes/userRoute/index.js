const UserRoute = require("express").Router();
const passport = require("passport");
const UserController = require("../../controllers/user");
const { verifyToken, verifyLoginToken } = require("../../utils/auth");

UserRoute.get("/user", verifyLoginToken, UserController.getUserDetails);
UserRoute.get("/user/get-all-users", verifyToken, UserController.getAllUsers);
UserRoute.get("/user/:id", verifyToken, UserController.getUserById);
UserRoute.post("/user", UserController.addNewUser);
UserRoute.post("/login", UserController.loginHandler);
UserRoute.patch("/user/:id", verifyToken, UserController.updateUser);
UserRoute.delete("/user/all-user", verifyToken, UserController.deleteAllUser);
UserRoute.delete("/user/:id", verifyToken, UserController.deleteUser);
UserRoute.get("/user/google", UserController.getGoogleUser);
UserRoute.get(
  "/user/google/callback",
  passport.authenticate("google", {
    session: false,
    // successRedirect: FED_BASE_URL,
  }),
  UserController.handleGoogleCallback
);

module.exports = UserRoute;

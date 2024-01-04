import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, render, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    const errors = { error: "Incorrect email or password!", };
    render("login.eta", errors)
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    const errors = { error: "Incorrect email or password!", };
    render("login.eta", errors)
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

const logout = async ({response, state}) => {
  await state.session.set("user", null);
  response.redirect("/auth/login");
}

export { logout, processLogin, showLoginForm };
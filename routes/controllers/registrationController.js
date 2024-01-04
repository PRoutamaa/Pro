import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const userData = {
    email: params.get("email"),
    password: params.get("password"),
  };

  const [passes, errors] = await validasaur.validate(
    userData,
    choreValidationRules,
);
const userEmail = await userService.findUserByEmail(userData.email)
if (!passes) {
    console.log(errors);
    userData.validationErrors = errors;
    render("registration.eta", userData);
} else if (userEmail[0] !== undefined) {
    userData.validationErrors =  { email: { registered: "This email is already registered!" }, };
    render("registration.eta", userData);
} else {
    await userService.addUser(
      userData.email,
      await bcrypt.hash(userData.password),
    );
    response.redirect("/auth/login");
  };
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };
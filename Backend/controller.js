const User = require("./mongoDB/user"); // Assuming this is the correct path to your User model

// LogIn Function
exports.logIn = async (req, res) => {
  console.log("Login:::: Function Call");
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user in the database using the provided email and password
    const check = await User.findOne({ email: email, password: password });

    // If the user exists, return status 200 with user data
    if (check) {
      res.json({
        status: 200,
        data: check,
      });
    } else {
      // If user does not exist, return status 404 (Not Found)
      res.json({
        status: 404,
        error: "User not found",
      });
    }
  } catch (e) {
    // Catch any errors and return status 500 (Server Error)
    console.error(e);
    res.json({
      status: 500,
      error: "An error occurred during login",
    });
  }
};

// SignUp Function
exports.signup = async (req, res) => {
  console.log("SignUp:", req.body);
  const data = req.body;

  try {
    // Create a new user in the database using the provided data
    await User.create(data);
    console.log("SignUp Successful");

    // Return a success status
    res.json({
      status: 200,
      message: "User created successfully",
    });
  } catch (e) {
    // Catch any errors and return status 500 with an error message
    console.log("Error:", e);
    res.json({
      status: 500,
      error: "An error occurred during signup",
    });
  }
};

const User = require("./mongoDB/user"); // Assuming this is the correct path to your User model
const Person=require("./mongoDB/Person")
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
      message: "person created successfully",
      data:req.body
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
//req Person
exports.createPerson = async (req, res) => {
  const data =  req.body;
  console.log("Person Request:",data);
  
  try {
    // Create a new user in the database using the provided data
    await Person.create(data);
    console.log("Person Created");

    // Return a success status
    res.json({
      status: 200,
      message: "User created successfully",
      data
    });
  } catch (e) {
    // Catch any errors and return status 500 with an error message
    console.log("Error:", e);
    res.json({
      status: 500,
      error: "An error occurred during  Addition",
    });
  }
};

exports.editPerson = async (req, res) => {
  console.log("Person Request:", req.body);
  const { name, phoneNumber, city } = req.body;  // Destructure data from request body

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name },  // Search for a person with the given name
      { phoneNumber, city },  // The updated data
      { new: true }  // Return the updated document after modification
    );

    // If no person was found, return an error
    if (!updatedPerson) {
      return res.json({
        status: 404,
        error: "Person not found with the given name",
      });
    }

    console.log("Person Updated");

    // Return a success status with the updated person data
    res.json({
      status: 200,
      message: "User updated successfully",
      data: updatedPerson,  // Optionally, return the updated person data
    });
  } catch (e) {
    // Catch any errors and return status 500 with an error message
    console.log("Error:", e);
    res.json({
      status: 500,
      error: "An error occurred during the update",
    });
  }
};
exports.deletePerson=async (req,res)=>{
  console.log("In Delete Person");
  const {name,phoneNumber,city}=req.body
  try{
    const result = await Person.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.json({
        status: 404,
        error: "Person not found with the given name",
      });
    }

    console.log("Person Deleted");

    res.json({
      status: 200,
      message: "Person deleted successfully",
    });

  }
  catch(exception){
    console.log("Error:", e);
    res.json({
      status: 500,
      error: "An error occurred during the update",
    });
  }
};

exports.getPersons = async (req, res) => {
  console.log("In Get All Persons");

  try {
    // Fetch all persons from the database
    const persons = await Person.find(); // Finds all documents in the Person collection

    if (persons.length <0) {
      return res.status(404).json({
        status: 404,
        error: "No persons found in the database",
      });
    }

    console.log("Persons found:", persons);

    // Return the list of persons
    res.json({
      status: 200,
      persons, // Sending all persons in the response
    });
  } catch (error) {
    console.log("Error:", error);

    // Return error if something goes wrong during the database operation
    res.status(500).json({
      status: 500,
      error: "An error occurred while fetching persons",
    });
  }
};

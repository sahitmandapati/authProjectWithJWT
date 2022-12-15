//check username , password in post(login) request
// if exist create new JWT
//send back to frontend

//setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  //

  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }
  // console.log(username,password)

  //just for demo, normally provided by DB
  const id = new Date().getDate();

  // try to keep payload small, better experiance for user
  //just for demo , in production use long, complex and unguessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // console.log(req.headers)

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  //   console.log({token : token})

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello , ${decoded.username}`,
      secret: `Here is your authourized data, your lucky number is ${luckyNumber} `,
    });

    console.log(decoded)
  } catch (error) {
    throw new CustomAPIError("Not authourized to access this route", 401);
  }


};

module.exports = {
  login,
  dashboard,
};

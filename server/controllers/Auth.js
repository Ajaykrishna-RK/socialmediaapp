import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UUser from "../model/UserModel.js";
import Admin from "../model/AdminModel.js";

// Register User

export const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = newUser.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update 
export const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const {userId} = req.params ; // Assuming you have the user ID in the request parameters

console.log(userId,"if")

    // Optional: Check if the user exists in the database before updating
    const existingUser = await UUser.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user object with the new details
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    // existingUser.email = email;
    existingUser.picturePath = picturePath;
    existingUser.friends = friends;
    existingUser.location = location;
    existingUser.occupation = occupation;

    // Optional: Check if the password is provided and update it
    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      existingUser.password = passwordHash;
    }

    // Save the updated user object
    const updatedUser = await existingUser.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UUser.findOne({ email: email });

    if (!user) return res.status(400).json({ message: "USer Does Not Exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid crendentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin

export const AdminRegister = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const AdminRegister = await Admin.create({
      adminName,
      email,
      password: passwordHash,
    });

    res.status(200).json(AdminRegister);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ message: "Not an Admin" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid crendentials" });

      const Admintoken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
      delete admin.password;
  
      res.status(200).json({ Admintoken, admin });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

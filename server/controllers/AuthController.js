import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

// SIGNUP ROUTE
const signup = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        
        let user = await User.findOne( { email } )
        if(user) {
            return res.status(400).json({success: false, message: "Please Login"})
        }

        const securePassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: securePassword
        })

        await user.save()

        return res
           .status(201)
           .json({ success: true, message: "Signup Successfull"})
    } catch (error) {
        return res.status(500).json( { success: false, message: error.message});
    }
}

// LOGIN ROUTE

dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;

    
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Please signup" });
        }
        console.log(user)

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        console.log("Tokeen....",token)

        // Cookie options
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        };

        // Get user data excluding password
        const loggedInUser = await User.findById(user._id).select("-password");

        // Set cookie and respond
        res.status(200)
           .cookie("token", token, options)
           .json({ success: true, user: loggedInUser, token, message: "User login successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// LOGOUT ROUTE
const logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true
        }
        res.clearCookie("token", options).json({success: true, message: "User logged out successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// GET USER ROUTE
const getUser = async (req, res) => {
    const reqId = req.id;

    try {
        let user = await User.findById(reqId).select("-password")   

        if(!user) {
            return res.status(400).json({success: false, message: "User not found"})
        }

        return res.status(200).json( {success: true, user, message: "User found"})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// RESET PASSWORD ROUTE
const resetPassword = async (req, res) => {
    const {email} = req.body

    try {
    
        const generateOtp = Math.floor(Math.random() * 10000); // Generate 4 digit otp

        let user = User.findOne({email})

        if(!user) {
            return res.status(400).json({success: false, message: "Please Signup"})
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "287ab9345f95f2",
              pass: "00795e6395558a"
            }
          });

          const info = await transporter.sendMail({
            from: 'niranjansinghhh16@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔ New Otp is generated", // Subject line
            html: `<h3>Your Generated Otp is : <i>${generateOtp}</i></h3>`, // html body
          });

          if(info.messageId) {
            await User.findByIdAndUpdate({email}, {
                $set: {
                    otp: generateOtp
                }
            })
            return res.status(200).json({success: true, message: "Otp has been sent to email"})
          }

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// VERIFY OTP ROUTE
const verifyOtp = async (req, res) => {
    const {otp, newPassword} = req.body;

    try {
        
        const securePassword = await bcrypt.hash(newPassword, 10);

        let user = await User.findByIdAndUpdate({otp}, {
            $set: {
                password: securePassword,
                otp: 0,
            },
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid otp"})
        }

        return res.status(200).json({success: true, message: "Password updated successfully"})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export {
    signup,
    login,
    logout,
    getUser,
    resetPassword, 
    verifyOtp
}
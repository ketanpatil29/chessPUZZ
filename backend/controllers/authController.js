import User from "../models/User.js";
import bcyrpt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email })
        if(existingUser)
        {
            return res.status(400).json({ message: "User already exist" });
        }

        const hasedPassword = await bcyrpt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hasedPassword,
            authProvider: "local"
        })

        res.status(200).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch(err) 
    {
        console.error("registration failed", err);
        res.status(400).json({ message: "Server error..." });
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if( !email || !password )
        {
            return res.status(400).json({ message: "Email and Password field required" });
        }

        const user = await User.findOne({ email })
        if(!user)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordMatch = await bcyrpt.compare( password, user.password )
        if(!isPasswordMatch)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch(err) {
        console.error("Login failed", err);
        res.status(400).json({ message: "Login failed(Server error)" });
    }
}

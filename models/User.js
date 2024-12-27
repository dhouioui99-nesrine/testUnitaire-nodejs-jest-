const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: "Your username is required"
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: true,
            max: 25,
        },
        role: { type: String, default: "employee" },
    },
    
    { timestamps: true }
);


const User=mongoose.model("users", UserSchema);
module.exports=User;
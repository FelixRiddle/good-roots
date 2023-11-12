import { check, validationResult } from "express-validator";

import { generateJwtToken } from "../../../../helpers/tokens.js";
import User from "../../../../models/User.js";

// Backend authentication 
const authenticate = async (req, res) => {
    // Validation
    await check("password")
        .notEmpty()
        .withMessage("The password is required")
        .run(req);
    await check("email")
        .isEmail()
        .withMessage("The email is wrong")
        .run(req);
    
    // Check result
    let result = validationResult(req);
    
    console.log(`User validated!`);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/login", {
            page: "Login",
            errors: result.array(),
        });
    }
    
    // Get user data
    const { email, password } = req.body;
    
    // Get the user
    let user = await User.findOne({
        where: {
            email,
        }
    });
    
    // Check if user exists
    if(!user) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    // Don't tell the user it's the email
                    msg: "Email or password is wrong."
                }
            ],
            user: req.body,
        });
    }
    
    // Check that the user is verified
    if(!user.confirmedEmail) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    msg: "The E-Mail is not verified, if you are the owner, please go to your inbox and verify it."
                }
            ],
            user: req.body,
        });
    }
    
    // Check if passwords match
    if(!user.verifyPassword(password)) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    msg: "Email or password is wrong."
                }
            ],
            user: req.body,
        });
    }
    
    // Remove the password from the user object
    const user_safe = {
        ...user.dataValues,
        // Remove sensitive stuff
        password: "",
        token: "",
    };
    const token = generateJwtToken(user_safe);
    
    console.log(`Going to endpoint myProperties`);
    return res.cookie("_token", token, {
        httpOnly: false,
    }).redirect("/user/property/myProperties");
}

export default authenticate;
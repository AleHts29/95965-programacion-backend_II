import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();


const midHello_01 = (req, res, next) => {
    console.log("Hello from middleware 01");
    next();
}

const midHello_02 = (req, res, next) => {
    console.log("Hello from middleware 02");
    next();
}

const midHello_03 = (req, res, next) => {
    console.log("Hello from middleware 03");
    next();
}

router.get("/", midHello_01, midHello_02, midHello_03, async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({ result: "success", payload: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// POST /api/users
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        //validar parametros
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // DTO
        const newUser = {
            first_name,
            last_name,
            email
        };

        // Create the user in the database
        const createdUser = await userModel.create(newUser);

        // Send the created user as a response
        res.status(201).json({ result: "success", payload: createdUser });
    } catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})



// PUT /api/users/:uid
router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params; // buscar el recurso por el id
        const { first_name, last_name, email } = req.body; // obtener los datos a actualizar

        // Validate required fields
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // DTO
        const updatedUserData = {
            first_name,
            last_name,
            email
        };

        // Update the user in the database
        const updatedUser = await userModel.findByIdAndUpdate(uid, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send the updated user as a response
        res.status(200).json({ result: "success", payload: updatedUser });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})




// DELETE /api/users/:uid
router.delete("/:uid", async (req, res) => {
    try {

        const { uid } = req.params; // buscar el recurso por el id

        // Delete the user from the database
        const deletedUser = await userModel.findByIdAndDelete(uid);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send a success response
        res.status(200).json({ result: "success", payload: `User_ID:${deletedUser._id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


export default router;
import DataUser from "../models/dataUserModel.js";

let nextUserId = 11;
console.log(DataUser.id);

export const getDataUsers = async (req, res) => {
    try {
        const dataUsers = await DataUser.find({});
        res.json(dataUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching datausers" });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        userData.id = nextUserId++;

        const newUser = await DataUser.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating data user:", error);
        res.status(500).json({ message: "Error creating data user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await DataUser.deleteMany({ id });

        res.status(200).json({ message: "DataUsers deleted successfully" });
    } catch (error) {
        console.error("Error deleting dataUsers:", error);
        res.status(500).json({ error: "Failed to delete dataUsers" });
    }
};

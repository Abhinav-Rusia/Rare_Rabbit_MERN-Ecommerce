import Subscriber from "../models/Subscriber.model.js";

export const createSubscriber = async (req, res) => {

    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Check if email is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }
        // Create new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send success response
        return res.status(201).json({ message: "You’re in, bestie. 👜👟 Get ready for fashion drops hotter than your ex’s DMs. 💅" });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }

}
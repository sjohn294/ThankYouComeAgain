const { User, Thought } = require('../models');

module.exports= {
    async getusers(req, res){
        //get all users
        try {
            const users= await User.find().populate("thoughts");
        
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getSingleUser(req,res){
        //get user by id
        try {
            const user= await User.findOne({
                _id:req.params.userId
            }).populate("thoughts")
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req,res){
        try {
            const users= await User.create(req.body);
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
            
        }
    },
    async updateUser(req,res){
        try {
            const updateduser= await User.findByIdAndUpdate({_id:req.params.userId},{$set: req.body},{new:true, runValidators:true});
            if(!updateduser){
                return res.status(404).json({
                    message: "user not found"
                })
            }
            res.json(updateduser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteUser (req, res){
        try {
            const deletedUser= await User.findByIdAndDelete({_id:req.params.userId});
            if(!deletedUser){
                return res.status(404).json({
                    message: "user not found"
                })
            }
            await Thought.deleteMany({_id:{$in: deletedUser.thoughts}});
            res.json({message: "User and thoughts deleted"})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async addFriend(req, res) {
        try {
            // Assuming that `friends` is an array of ObjectId references to the User model
            const newFriend = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to prevent duplicates
                { new: true, runValidators: true }
            );
            if (!newFriend) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(newFriend);
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
async deleteFriend(req, res) {
    try {
        // Assuming that `friends` is an array of ObjectId references to the User model
        const removedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend ID from the array
            { new: true }
        );
        if (!removedFriend) {
            return res.status(404).json({ message: "User not found or friend not found" });
        }
        res.json(removedFriend);
    } catch (error) {
        res.status(500).json(error);
    }
}
}
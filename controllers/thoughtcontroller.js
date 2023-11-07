const { User, Thought } = require('../models');

module.exports= {
    async getThoughts(req, res){
        //get all users
        try {
            const thoughts= await Thought.find();
            res.json(thoughts)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getSingleThought(req,res){
        //get user by id
        try {
            const thought= await Thought.findOne({
                _id:req.params.thoughtId
            })
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createThought(req,res){
        try {
            const thought= await Thought.create(req.body);
            const updateduser= await User.findByIdAndUpdate({_id: req.body.userId},{$push:{thoughts:thought._id}},{new: true})
            res.json(updateduser)
        } catch (error) {
            res.status(500).json(error)
            
        }
    },
    async updateThought(req,res){
        try {
            const updatedThought= await Thought.findByIdAndUpdate({_id:req.params.thoughtId},{$set: req.body},{new:true, runValidators:true});
            if(!updatedThought){
                return res.status(404).json({
                    message: "couldn't change your mind"
                })
            }
            res.json(updatedThought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteThought (req,res){
        try {
            const thought= await Thought.findOneAndDelete({_id:req.params.thoughtId});
            if(!thought){return res.status(404).json({message: "no thought found"})};
            await User.findOneAndUpdate({thoughts:req.params.thoughtId},{$pull: {thoughts:req.params.thoughtId}},{new: true});
            res.json({message: "thought deleted"})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async addReaction (req,res){
        try {
            const updatedThought = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$addToSet:{reactions:req.body}},{new: true, runValidators: true});
            if(!updatedThought){return res.status(404).json({message: "no thought found"})};
            res.json(updatedThought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteReaction(req, res){
        try {
            const updatedThought = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull:{reactions:{reactionId:req.params.reactionId}}},{new: true, runValidators: true});
            if(!updatedThought){return res.status(404).json({message: "no thought found"})};
            res.json(updatedThought)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
}
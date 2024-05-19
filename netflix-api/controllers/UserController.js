const User = require("../models/UserModel");

module.exports.addToLikedMovies = async(req, res) => {
    try {
        console.log("I am herere")
        const {email, data} = req.body;
        console.log("The Email and Data is ", email, data)
        const user = await User.findOne({email})
        if(user) {
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
            if(!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id, {
                        likedMovies: [...user.likedMovies, data]
                    },
                    {new: true}
                )
            }
            else 
                return res.json({msg: "Movie already added to the liked list"})
        } else await User.create({email, likedMovies: [data]})
        return res.json({msg: "Movie added successfully!"})
    } catch (error) {
        return res.json({msg: "Error adding movie"})
    }
}

module.exports.getLikedMovies = async(req, res) => {
    try {
        console.log("getLikedMovies called")
        console.log("The params are ", req.params)
        const {email} = req.params;

        const user = await User.findOne({email})
        console.log("The mail and user details are ", email, user)
        if(user) {
            return res.json({msg: "success", movies: user.likedMovies})
        } 
        else return res.json({msg: "User with given email not found"})

    } catch (error) {
        return res.json({msg: "Error fetching the liked movies"})
    }
}

module.exports.removeFromLikedMovies = async(req, res) => {
    try {
        const {email, movieId} = req.body;
        const user = await User.findOne({email})
        console.log("The emailID is ", email)
        console.log("Deleting user liked movie: ", user)
        if(user) {
            const {likedMovies} = user;
            console.log("The Liked Movies are : ", likedMovies)
            console.log("The Movie Id is : ", movieId)
            
            const currentMovies = []
            for(var i=0;i<likedMovies.length;i++){
                console.log("The liked movies id is : ", likedMovies[i].id)
                if(likedMovies[i].id != movieId)
                    currentMovies.push(likedMovies[i])
            }
            console.log("Doneee")
            
            console.log("The current list of movies are ", currentMovies)
            await User.findByIdAndUpdate(
                user._id, {
                    likedMovies: currentMovies
                },
                {new: true}
            )
            console.log("The Current Movies after deletion", currentMovies)
            return res.json({msg: "Movie Deleted", movies: currentMovies})   
        }
    } catch (error) {
        return res.json({msg: "Error deleting the liked movies"})
    }
}
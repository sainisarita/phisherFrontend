const {User} = require('../models/user')
const {Like} = require('../models/like')
const {Post} = require('../models/post')
module.exports = {
    createUser: async(userDetail)=>{
        return await User.create(userDetail)
        
    },
    getUser: async(email)=> {
       return await User.findOne({ where: { email: email } });
    },
    getUserById: async(id)=> {
        return await User.findOne({ where: { id: id } });
    },
    postComment: async(data)=>{
        return await User.create(data)
    },
    likes: async(likeData)=> {
      return await Like.create(likeData)  
    },
    getLikes: async(id)=> {
        return 
    },
    imagePost : async(image)=>{
        return await Post.create(image)
    },
    getAllPost: async()=> {
        Post.findAll({
            attributes: ['image', 'description'], // Only retrieve the id and name columns
          })
            .then((users) => {
              console.log(users);
            })
            .catch((error) => {
              console.error('Error retrieving users:', error);
            });
    }

}
var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({

    githubId:Number,
    login: String,
    name: String,
    email: String,
    avatar_url: String,
    url: String,        //"https://api.github.com/users/octocat"
    html_url: String,   //"https://github.com/octocat",
    location: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,

    accessToken:String,
    totalFiddles:Number,
    startedFiddles:[String]     //We will store fiddle string here NOT objectID
});

usersSchema.statics.findOrCreate = function(profile,accessToken) {
    var Users = this;
    return Users.findOne({githubId:profile.id}).then( (user) => {
            //If user found return that
            if(user) {
                // Updating accessToken is necessary for exportAsGist
                if(user.accessToken !== accessToken){
                    user.accessToken = accessToken;
                    return user.save();
                } else {
                    return Promise.resolve(user);
                }
            }
            //Create new user
            let NewUser = new Users({
                githubId:profile.id,
                login: profile._json.login,
                name: profile._json.name,
                email: profile._json.email? profile._json.email[0] : null,
                avatar_url: profile._json.avatar_url,
                url: profile._json.url,
                html_url: profile._json.html_url,
                location: profile._json.location,
                bio: profile._json.bio,
                public_repos: profile._json.public_repos,
                public_gists: profile._json.public_gists,
                accessToken:accessToken
            })

          return  NewUser.save();

    }).catch ( err => Promise.reject(err));
}



var Users = mongoose.model('Users',usersSchema) ;

module.exports = Users ;

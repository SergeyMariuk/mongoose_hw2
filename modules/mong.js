const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const databaseName = 'someDatabaseName';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
    useFindAndModify: false
};

mongoose.connect('mongodb://localhost:27017/myapp', options)
    .then(() => console.log("connected."))
    .catch((error) => console.log(`Error connecting to MongoDB ${error}`))

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
},
{
    versionKey: false 
});

const dbUsers = mongoose.model("user", userSchema);

class MongDb{
    async main(){
        return `Main Page`
    }
    async welcome(){
        return `Welcome on Board`
    }
    async register(body){
        try {
            const {name, email, password} = body;

            // const oldUser = await dbUsers.findOne({ email });
            // await dbUsers.findByIdAndDelete('')
            // const allUsers = await dbUsers.find({})
            // return allUsers;

            const encryptedPassword = await bcrypt.hash(password, 10);
            
            const user = await dbUsers.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
            user.token = token;
            return user
            } catch (err) {
                console.log(err);
            }
        
    }
    async login(body){
        try {
            const { email, password } = body;
            if (!(email && password)) {
                return null;
            }
            const user = await dbUsers.findOne({ email });
        
            if (user && (await bcrypt.compare(password, user.password))) {
              const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "1h",
                }
              );
              user.token = token;
              return user;
            }
            return null;
          } catch (err) {
            console.log(err);
          }
    }
}

module.exports = new MongDb;

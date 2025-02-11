import mongoose, {model, Schema} from 'mongoose'
import dotenv from 'dotenv'

// Initialised dotenv
dotenv.config()

const mongoURL = process.env.MONGO_URL

if (!mongoURL) {
    throw new Error('MONGO_URL environment variable is not defined')
}
mongoose.connect(mongoURL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err))

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User",UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:"Tag"}],
    userId: [{type: mongoose.Types.ObjectId, ref:"User", required: true}],
})

export const ContentModel = model("Content",ContentSchema);

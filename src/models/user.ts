import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'student', 'teacher'],
        default: ['user'],
    },
})

// const User = mongoose.model('User', userSchema)

const User = models?.User || mongoose.model('User', userSchema)

export default User

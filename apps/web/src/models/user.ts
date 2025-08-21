// src/models/user.ts
import { Schema, model, models, type Document, type Model } from 'mongoose'

/** אפשר להשאיר Flexible בשדות מורכבים כדי לא להילחם עכשיו בטיפוסים */
type Mixed = unknown

const AcademySchema = new Schema(
    {
        plan: { type: String, default: 'free' },
        startingDate: { type: Date },
        active: { expiredDate: { type: Date } },
        learningDiary: { tracks: { type: [Schema.Types.Mixed], default: [] } },
        modulesStatus: { type: [Schema.Types.Mixed], default: [] },
        musicStudies: {
            musicPieces: { type: [Schema.Types.Mixed], default: [] },
        },
    },
    { _id: false }
)

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        hashedPassword: { type: String },
        roles: { type: [String], default: ['user'] },
        username: { type: String, default: null },
        academy: { type: AcademySchema, default: null },
    },
    { timestamps: true }
)

export interface UserDoc extends Document {
    email: string
    firstName: string
    lastName: string
    hashedPassword?: string
    roles: string[]
    username?: string | null
    academy?: {
        plan: string
        startingDate?: Date
        active?: { expiredDate?: Date }
        learningDiary?: { tracks: Mixed[] }
        modulesStatus?: Mixed[]
        musicStudies?: { musicPieces: Mixed[] }
    } | null
}

export type UserModel = Model<UserDoc>

// חשוב: לא להשאיר את המשתנה כ־union. מאחדים לטיפוס אחד.
const User =
    (models.User as UserModel) ||
    (model<UserDoc>('User', UserSchema) as UserModel)

export default User

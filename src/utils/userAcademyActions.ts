import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { TaskStatus, Track } from '@/types'

const addNewTrack = async (formData: FormData, userId: string) => {
    await connectMongoDB()
    const userFromDatabase = await User.findOne({ _id: userId })
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const startingDateString = formData.get('startingDate') as string
    const startingDate = new Date(startingDateString)
    const tags = (formData.get('tags') as string).split(',')
    const status = formData.get('status') as TaskStatus

    const newTrack = {
        title,
        description,
        sections: [],
        status,
        startingDate,
        completionDate: new Date(),
        tags,
    } as unknown as Track

    userFromDatabase?.academy.learningDiary.tracks.push(newTrack)

    // Update the user in the database
    await User.updateOne(
        {
            _id: userId,
        },
        {
            academy: userFromDatabase?.academy,
        }
    )
}

export const userAcademyActions = {
    addNewTrack,
}

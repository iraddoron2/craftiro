import { currentEnvironment } from '@/constants'
import { Track, User } from '@/types'

export const getTrackFromTrackId = (user: User, trackId: string) => {
    const track = user.academy.learningDiary.tracks.find(
        (track) => track.id === trackId
    )
    return track as Track | undefined
}

export const getLessonFromLessonId = (user: User, lessonId: string) => {
    const lesson = user.academy.learningDiary.tracks
        .flatMap((track) => track.sections)
        .flatMap((section) => section.lessons)
        .find((lesson) => lesson.id === lessonId)
    return lesson
}

export const getLessonNumberInTrackFromLessonId = (
    user: User,
    lessonId: string
) => {
    const track = user.academy.learningDiary.tracks.find((track) => {
        return track.sections
            .flatMap((section) => section.lessons)
            .some((lesson) => lesson.id === lessonId)
    })
    if (!track) return
    const lessonIndex = track.sections
        .flatMap((section) => section.lessons)
        .findIndex((lesson) => lesson.id === lessonId)
    return lessonIndex + 1
}

export const getDayInWeekFromDateHebrew = (date: Date) => {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    return days[date.getDay()]
}

export const getDateInFormatDDMMYYYY = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export const getTimeFromDateInFormatHHMM = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${hour}:${minute}`
}

export const getTimeBetweenDatesInMinutes = (date1: Date, date2: Date) => {
    const diff = date1.getTime() - date2.getTime()
    return Math.abs(Math.round(diff / 1000 / 60))
}

export const getBaseDomain = () => {
    if (currentEnvironment === 'dev') {
        return 'http://localhost:3000'
    } else {
        return 'https://www.craftiro.com'
    }
}

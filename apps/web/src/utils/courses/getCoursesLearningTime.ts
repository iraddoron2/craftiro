import type { CraftiroCourse } from '@/types/craftiroCourses'

export const getCoursesLearningTime = (courses: CraftiroCourse[]) => {
    let coursesLearningTime = 0
    if (!courses || courses.length === 0) {
        coursesLearningTime = -1
        return coursesLearningTime
    }

    console.log('Calculating learning time for courses:', courses)

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i]
        if (!course || !course.levels || course.levels.length === 0) {
            continue // Skip courses without levels
        }
        const levels = course.levels
        for (let j = 0; j < levels.length; j++) {
            const level = levels[j]
            if (!level || !level.steps || level.steps.length === 0) {
                continue // Skip levels without steps
            }
            const steps = level.steps
            for (let k = 0; k < steps.length; k++) {
                const step = steps[k]
                if (!step || !step.screens || step.screens.length === 0) {
                    continue // Skip steps without learning time
                }
                const screens = step.screens
                for (let l = 0; l < screens.length; l++) {
                    const screen = screens[l]
                    if (!screen || !screen.learningTimeInSeconds) {
                        continue // Skip screens without learning time
                    }
                    coursesLearningTime += screen.learningTimeInSeconds
                }
            }
        }
    }

    return coursesLearningTime
}

import { userAcademyActions } from '@/utils'
import { Stack } from '@core'

type Props = {
    userId: string
}

export const AddTrackForm = async ({ userId }: Props) => {
    const formAction = async (formData: FormData) => {
        'use server'
        await userAcademyActions.addNewTrack(formData, userId)
    }

    return (
        <form action={formAction}>
            <Stack
                sx={{
                    gap: 2,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            >
                <label>
                    כותרת המסלול:
                    <input type="text" name="title" />
                </label>
                <label>
                    תיאור המסלול:
                    <input type="text" name="description" />
                </label>
                <label>
                    תאריך התחלה:
                    <input type="date" name="startingDate" />
                </label>

                <label>
                    תגיות:
                    <input type="text" name="tags" />
                </label>
                <label>
                    סטטוס:
                    <select name="status">
                        <option value="not-started">לא התחיל</option>
                        <option value="in-progress">בתהליך</option>
                        <option value="completed">הושלם</option>
                    </select>
                </label>
                <button type="submit">הוסף מסלול</button>
            </Stack>
        </form>
    )
}

import { User } from '@/types'
import { create } from 'zustand'

interface UserState {
    user: User | null
    updateUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    updateUser: (user) => set({ user }),
}))

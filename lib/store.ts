'use client'

import { create } from 'zustand'

interface UserInfo {
  id: number
  name: string
  email: string
}

interface AppState {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
}

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export default useStore

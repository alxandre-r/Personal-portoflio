import { create } from 'zustand'

export type ProjectFilter = 'all' | 'web' | 'fullstack' | 'tool' | 'mobile' | 'game'

interface ProjectStore {
  activeFilter: ProjectFilter
  setFilter: (filter: ProjectFilter) => void
}

export const useProjectStore = create<ProjectStore>()((set) => ({
  activeFilter: 'all',
  setFilter: (filter) => set({ activeFilter: filter }),
}))

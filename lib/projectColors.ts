import type { ProjectColor } from './data/types'

export interface ColorPalette {
  gradientFrom: string
  gradientTo: string
  text: string
  border: string
  bgSoft: string
  topBar: string
}

export const projectColors: Record<ProjectColor, ColorPalette> = {
  indigo: {
    gradientFrom: '#4f46e5',
    gradientTo: '#312e81',
    text: '#818cf8',
    border: 'rgba(79,70,229,0.35)',
    bgSoft: 'rgba(79,70,229,0.08)',
    topBar: '#4f46e5',
  },
  blue: {
    gradientFrom: '#2563eb',
    gradientTo: '#1e3a8a',
    text: '#60a5fa',
    border: 'rgba(59,130,246,0.35)',
    bgSoft: 'rgba(59,130,246,0.08)',
    topBar: '#3b82f6',
  },
  green: {
    gradientFrom: '#16a34a',
    gradientTo: '#14532d',
    text: '#4ade80',
    border: 'rgba(34,211,128,0.35)',
    bgSoft: 'rgba(34,211,128,0.08)',
    topBar: '#22c55e',
  },
  emerald: {
    gradientFrom: '#059669',
    gradientTo: '#064e3b',
    text: '#34d399',
    border: 'rgba(16,185,129,0.35)',
    bgSoft: 'rgba(16,185,129,0.08)',
    topBar: '#10b981',
  },
  cyan: {
    gradientFrom: '#0891b2',
    gradientTo: '#164e63',
    text: '#22d3ee',
    border: 'rgba(6,182,212,0.35)',
    bgSoft: 'rgba(6,182,212,0.08)',
    topBar: '#06b6d4',
  },
  amber: {
    gradientFrom: '#d97706',
    gradientTo: '#92400e',
    text: '#fbbf24',
    border: 'rgba(245,158,11,0.35)',
    bgSoft: 'rgba(245,158,11,0.08)',
    topBar: '#f59e0b',
  },
}

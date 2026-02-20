import type { TFileItem } from '@/pages/Stats/DataExport/FileItem'

export const MOCK_FILES: TFileItem[] = [
  { id: '1', name: 'Сотрудники_экспорт.pdf', size: 1240000, status: 'idle' },
  { id: '2', name: 'Сотрудники_экспорт_2025.pdf', size: 3500000, status: 'downloading' },
  { id: '3', name: 'Сотрудники_экспорт_2024.pdf', size: 1200, status: 'idle' },
  { id: '4', name: 'presentation_v2.pptx', size: 8900000, status: 'idle' },
  { id: '5', name: 'database_dump.sql', size: 45000000, status: 'downloading' },
  { id: '6', name: 'logo_final.svg', size: 45000, status: 'idle' },
  { id: '7', name: 'README.md', size: 2500, status: 'idle' },
  { id: '8', name: 'archive_logs.zip', size: 120000000, status: 'downloading' },
  { id: '9', name: 'budget_planning.xlsx', size: 750000, status: 'idle' },
  { id: '10', name: 'avatar_user_99.png', size: 150000, status: 'idle' }
]

import type { TFile } from '@/pages/Stats/DataExport/DataExport.types'
import { v4 as uuidv4 } from 'uuid'

export const MOCK_FILES: TFile[] = [
  { id: uuidv4(), name: 'Сотрудники_экспорт.pdf', size: 1240000 },
  { id: uuidv4(), name: 'Сотрудники_экспорт_2025.pdf', size: 3500000 },
  { id: uuidv4(), name: 'Сотрудники_экспорт_2024.pdf', size: 1200 },
  { id: uuidv4(), name: 'presentation_v2.pptx', size: 8900000 },
  { id: uuidv4(), name: 'database_dump.sql', size: 45000000 },
  { id: uuidv4(), name: 'logo_final.svg', size: 45000 },
  { id: uuidv4(), name: 'README.md', size: 2500 },
  { id: uuidv4(), name: 'archive_logs.zip', size: 120000000 },
  { id: uuidv4(), name: 'budget_planning.xlsx', size: 750000 },
  { id: uuidv4(), name: 'avatar_user_99.png', size: 150000 }
]

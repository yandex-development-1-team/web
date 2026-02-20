import type { TFileItem } from '@/pages/Stats/DataExport/FileItem'

export const MOCK_FILES: TFileItem[] = [
  { id: '1', name: 'report_2023_final.pdf', size: 2457600 }, // 2.3 M
  { id: '2', name: 'budget_planning.xlsx', size: 1048576 }, // 1.0 MB
  { id: '3', name: 'presentation_draft.pptx', size: 15728640 }, // 15.0 MB
  { id: '4', name: 'contract_signed_v2.docx', size: 512000 }, // 500 KB
  { id: '5', name: 'index_styles.css', size: 12288 }, // 12 KB
  { id: '6', name: 'hero_image_background.png', size: 3145728 }, // 3.0 MB
  { id: '7', name: 'meeting_notes_monday.txt', size: 5120 }, // 5 KB
  { id: '8', name: 'database_dump.sql', size: 45000000 }, // 42.9 MB
  { id: '9', name: 'api_schema_v1.json', size: 2048 }, // 2 KB
  { id: '10', name: 'manual_instruction.pdf', size: 8388608 } // 8.0 MB
]

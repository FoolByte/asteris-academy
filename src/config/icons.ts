import {
  GraduationCapIcon,
  ComputerTerminal01Icon,
  HeartHandshakeIcon,
  ComputerPhoneSyncIcon,
  BookOpen02Icon,
  TrophyIcon,
  UsersRoundIcon,
  AiArtIcon,
  AiTranslateIcon,
  AiChemistry02Icon,
} from '@hugeicons/core-free-icons'

// 1. Array options untuk digunakan di Payload CMS (Admin UI)
export const iconOptions = [
  { label: 'Graduation Cap (Pendidikan)', value: 'graduation-cap', icon: GraduationCapIcon },
  { label: 'Terminal (Coding/IT)', value: 'terminal', icon: ComputerTerminal01Icon },
  { label: 'Handshake (Karakter/Kolaborasi)', value: 'handshake', icon: HeartHandshakeIcon },
  { label: 'Devices (Fasilitas/Riset)', value: 'devices', icon: ComputerPhoneSyncIcon },
  { label: 'Book (Perpustakaan)', value: 'book', icon: BookOpen02Icon },
  { label: 'Trophy (Prestasi)', value: 'trophy', icon: TrophyIcon },
  { label: 'Users (Komunitas)', value: 'users', icon: UsersRoundIcon },
  { label: 'AI (Kecerdasan Artificial)', value: 'ai', icon: AiArtIcon },
  { label: 'Bahasa (Translate)', value: 'language', icon: AiTranslateIcon },
  { label: 'Sains (Ilmu Pengetahuan)', value: 'science', icon: AiChemistry02Icon },
]

// 2. Object map untuk digunakan di Frontend (Website)
// Ini akan otomatis mengubah array di atas menjadi object { 'graduation-cap': GraduationCapIcon, ... }
export const iconMap: Record<string, any> = iconOptions.reduce(
  (acc, curr) => {
    acc[curr.value] = curr.icon
    return acc
  },
  {} as Record<string, any>,
)

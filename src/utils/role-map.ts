interface RoleStyle {
  label: string
  textColor: string
  bgColor: string
}

/**
 * Helper untuk memformat role user beserta warnanya.
 *
 * @param role - Kode role (contoh: 'super-admin', 'admin', 'editor')
 * @returns Object berisi label dan kode warna hex
 */
export const getRoleFormat = (role: string): RoleStyle => {
  const roleMap: Record<string, RoleStyle> = {
    'super-admin': {
      label: 'Super Admin',
      textColor: '#991B1B', // Merah tua
      bgColor: '#FEE2E2', // Merah muda (pastel)
    },
    admin: {
      label: 'Admin',
      textColor: '#1E40AF', // Biru tua
      bgColor: '#DBEAFE', // Biru muda (pastel)
    },
    editor: {
      label: 'Editor',
      textColor: '#065F46', // Hijau tua
      bgColor: '#D1FAE5', // Hijau muda (pastel)
    },
  }

  const defaultRole: RoleStyle = {
    label: 'Unknown Role',
    textColor: '#374151',
    bgColor: '#F3F4F6',
  }

  // 3. Tambahkan proteksi (optional tapi best practice) jika variabel role undefined/null
  if (!role) return defaultRole

  return roleMap[role.toLowerCase()] || defaultRole
}

'use client'
import { useField } from '@payloadcms/ui'
import { HugeiconsIcon } from '@hugeicons/react'
import { iconOptions } from '@/config/icons'

export default function IconSelectComponent({
  path,
  label,
}: {
  path: string
  label?: Record<string, string> | string
}) {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type select" style={{ marginBottom: '20px' }}>
      <label className="field-label">Pilih Icon</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '10px',
          marginTop: '8px',
        }}
      >
        {iconOptions.map((opt) => {
          const isSelected = value === opt.value
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => setValue(opt.value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '8px',
                border: isSelected
                  ? '2px solid var(--theme-elevation-800)'
                  : '1px solid var(--theme-elevation-200)',
                background: isSelected ? 'var(--theme-elevation-150)' : 'var(--theme-elevation-50)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <HugeiconsIcon icon={opt.icon} size={28} className="mb-2" />
              <span
                style={{
                  fontSize: '12px',
                  textAlign: 'center',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {opt.label.split(' ')[0]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

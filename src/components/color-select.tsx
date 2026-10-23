'use client'

import { useField } from '@payloadcms/ui'
import { colorOptions } from '@/config/colors'

export default function ColorSelectComponent({
  path,
  label,
}: {
  path: string
  label?: Record<string, string> | string
}) {
  const { value, setValue } = useField<string>({ path })

  const displayLabel =
    typeof label === 'object' ? label?.['en'] || label?.['id'] || 'Warna Latar' : label

  return (
    <div className="field-type select" style={{ marginBottom: '20px' }}>
      <label className="field-label">{displayLabel || 'Pilih Warna Latar'}</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '10px',
          marginTop: '8px',
        }}
      >
        {colorOptions.map((opt) => {
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
              {/* Bulatan Preview Warna */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: opt.hex,
                  border: '1px solid var(--theme-elevation-200)',
                  marginBottom: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  textAlign: 'center',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

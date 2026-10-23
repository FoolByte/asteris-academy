// Komponen untuk mengunci lebar maksimal konten di tengah (max-w-300)
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`mx-auto max-w-300 px-5 ${className}`}>{children}</div>
}

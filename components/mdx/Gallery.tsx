export function Gallery({ children }: { children: React.ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2 [&>figure]:my-0">{children}</div>
}

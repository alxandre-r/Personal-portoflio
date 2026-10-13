/** Two columns from `sm` up, stacked on phones. Each direct child is a column. */
export function Columns({ children }: { children: React.ReactNode }) {
  return <div className="my-8 grid gap-6 sm:grid-cols-2 [&>*]:min-w-0">{children}</div>
}

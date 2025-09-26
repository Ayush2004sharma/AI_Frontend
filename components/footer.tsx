export function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-6xl p-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} BuyBixx. All rights reserved.</p>
        <p className="text-xs">Built with Next.js + Tailwind</p>
      </div>
    </footer>
  )
}

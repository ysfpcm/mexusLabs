import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Professional portfolio showcasing my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('contextmenu', (e) => e.preventDefault());
          `
        }} />
      </body>
    </html>
  )
}
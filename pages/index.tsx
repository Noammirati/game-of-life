import Image from 'next/image'
import { Inter } from 'next/font/google'
import Grid from '@/components/grid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Grid />
    </main>
  )
}

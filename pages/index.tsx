import Image from 'next/image'
import { Pixelify_Sans } from 'next/font/google'
import Grid from '@/src/components/grid'

const pixel = Pixelify_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={pixel.className}>
      <Grid />
    </main>
  )
}

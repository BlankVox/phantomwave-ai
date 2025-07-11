import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>PhantomWave.ai</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-phantom-purple-600">Hello PhantomWave.ai!</h1>
        <p className="mt-4 text-lg text-wave-teal-600">Your Notion for audio creators.</p>
      </main>
    </>
  )
} 
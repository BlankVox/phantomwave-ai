import Head from 'next/head'

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard | PhantomWave.ai</title>
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-3xl font-bold text-phantom-purple-600">Dashboard</h1>
                <p className="mt-4 text-lg text-gray-600">(Coming soon: Your audio projects will appear here!)</p>
            </main>
        </>
    )
} 
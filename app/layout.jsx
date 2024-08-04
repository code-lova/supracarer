import '@styles/global.css';


export const metadata = {
    title: 'Supracarer - More Than Care',
    desciption: 'AI generated matchmaking with ​highly trained caregivers'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
        <head>
            <link rel="icon" href="/assets/images/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon.ico" />
        </head>
        <body>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout
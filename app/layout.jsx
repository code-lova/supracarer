import '@styles/global.css';


export const metadata = {
    title: 'Supracarer - More Than Care',
    desciption: 'AI generated matchmaking with ​highly trained caregivers'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
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
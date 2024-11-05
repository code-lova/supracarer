import '@styles/global.css';
import { Toaster } from 'react-hot-toast';
import { ReactQueryProvider } from '@config/ReactQueryProvider';



export const metadata = {
    title: 'Supracarer - More Than Care',
    desciption: 'AI generated matchmaking with ​highly trained caregivers'
}

  

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
        <head>
            <link rel="icon" href='/assets/images/favicon.ico' />
            <link rel='apple-touch-icon' sizes='180x180' href='/assets/images/favicon.ico' />
            <link rel='icon' type='image/png' sizes='32x32' href='/assets/images/favicon.ico' />
            <link rel='icon' type='image/png' sizes='16x16' href='/assets/images/favicon.ico' />
        </head>
        <body>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            
            <main className='app'>
                <ReactQueryProvider>
                    {children}
                    <Toaster />
                </ReactQueryProvider>
            </main>
        </body>
    </html>
  )
}

export default RootLayout
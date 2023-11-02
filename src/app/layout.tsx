
import { AuthUserProvider } from './firebase/auth';
import NavBar from './components/navbar'

export const metadata = {
  title: 'Wattle Art Creations',
  description: 'Custom art creations',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <body>
        <AuthUserProvider>
          <NavBar />
          {children}
        </AuthUserProvider>  
      </body>
    </html>
  )
}

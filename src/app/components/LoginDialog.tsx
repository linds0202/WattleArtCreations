import { useAuth } from '@/app/firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

// Configure FirebaseUI., 
const uiConfig = {
    signInFlow: 'popup', 
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

interface LoginDialogProps {
    selection?: string | null | undefined,
    login: boolean,
    setLogin: Function,
}

const LoginDialog = ({ selection, login, setLogin }: LoginDialogProps) => {
    const { authUser, isLoading } = useAuth();
    const router = useRouter();

    const handleClose = (event: object, reason: string) => {   
        if (reason && reason == "backdropClick") {
            return
        }
    }

    const handleRedirect = () => {
        setLogin(false)
        router.push('/')
    }
    
    return (
        <Dialog 
            onClose={handleClose} 
            open={login} 
            fullWidth={true}
            maxWidth='xs'
            PaperProps={{ sx: { p: 6, backgroundColor: "#282828", color: "white", display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", border: "4px solid white", borderRadius: "10px", position: 'relative'} }}
        >
            <h3 className='text-2xl font-bold pb-0 mb-4'>Please Login to Continue</h3>
    
            {selection === 'NSFW' 
                ? <p className='pb-4 text-center mt-4'>In order to customize a NSFW portrait, you must Login or Create an Account</p>
                :
                <p className='pb-4 text-center mt-4'>In order to fully customize your portrait, please Login or Create an Account</p>
            }
            
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>

            <Button 
                onClick={handleRedirect}
                className='pt-4'
            >
                <div className='text-white border-2 border-white px-4 py-2 rounded-lg flex flex-col'>
                    <p className='text-md' >Return to Homepage</p>
                    <p className='text-xs text-[#DCDCDC]'>(You will lose any progress on your customization)</p>
                </div>
                    
            </Button>
         
        </Dialog>       
    )
}

export default LoginDialog
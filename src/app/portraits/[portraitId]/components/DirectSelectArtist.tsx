import { PortraitData } from "../../components/PortraitCustomizer"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { addSelectedArtist, updateArtistComms } from "@/app/firebase/firestore";

interface DirectSelectArtistProps {
    open: boolean,
    setOpen: Function,
    portrait: PortraitData,
    setPortrait: Function,
    artistId: String,
    setOpenArtistList: Function,
    name: string
}


const DirectSelectArtist = ({ open, setOpen, portrait, setPortrait, artistId, setOpenArtistList, name }:DirectSelectArtistProps ) => {

    const handleCancel = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
        }
    }

    const handleSubmit = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            for (const artist of portrait.artist) {
                if (artist.id !== artistId) updateArtistComms(artist.id)
            }

            const selection = portrait.artist.filter(artist => artist.id === artistId)[0]
            const updatedArtist = await addSelectedArtist(portrait.id, selection.id, selection.artistName)
            const updatedPortrait = {...portrait, artist: [{artistName: selection.artistName, id: selection.id}], artistAssigned: true, status: 'In Progress', lastUpdatedStatus: new Date}
            setPortrait(updatedPortrait)
            setOpen(false)
            setOpenArtistList(false)
        }
    }

    return (
        <Dialog disableEscapeKeyDown open={open} onClose={handleCancel}>
            <DialogTitle className="text-3xl text-center">Choose This Artist</DialogTitle>
            
            <DialogContent>
                <p className="text-xl text-center">Do you want to select <span className="text-[#4da0ff]">{name}</span> as your artist?</p>
                <p className='text-md mt-2 text-[#bababa]'>(Once you select your artist, you will not be able to change)</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DirectSelectArtist
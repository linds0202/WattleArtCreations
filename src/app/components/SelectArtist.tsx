import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PortraitData } from '../portraits/components/PortraitCustomizer';
import { addSelectedArtist, updateArtistComms } from '../firebase/firestore';

interface SelectArtistProps {
    open: boolean,
    setOpen: Function,
    portrait: PortraitData
}


export default function SelectArtist({ open, setOpen, portrait }: SelectArtistProps) {

    const [selectedArtist, setSelectedArtist] = useState<string>('');

    const artistChoices = portrait?.artist.map((artist) => <option key={artist.id} value={artist.id}>{artist.artistName}</option>)

    const handleChange = (event: SelectChangeEvent<typeof selectedArtist>) => {
        setSelectedArtist(event.target.value || '')
    }

    const handleCancel = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
        }
    };

    const handleSubmit = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            if (selectedArtist === '') {
                setOpen(false)
            } else {
                for (const artist of portrait.artist) {
                    if (artist.id !== selectedArtist) updateArtistComms(artist.id)
                }

                const selection = portrait.artist.filter(artist => artist.id === selectedArtist)[0]
                const updatedArtist = await addSelectedArtist(portrait.uid, selection.id, selection.artistName)
                setOpen(false)
            }
        }
    };

    return (
        <Dialog disableEscapeKeyDown open={open} onClose={handleCancel}>
            <DialogTitle>Select Your Artist from the Dropdown</DialogTitle>
            <p className='text-sm'>(Once you select your artist, you will not be able to change)</p>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="select-artist">Artist</InputLabel>
                        <Select
                            native
                            value={selectedArtist}
                            onChange={handleChange}
                            input={<OutlinedInput label="Artist" id="select-artist" />}
                        >
                            <option aria-label="None" value="" />
                            {artistChoices}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

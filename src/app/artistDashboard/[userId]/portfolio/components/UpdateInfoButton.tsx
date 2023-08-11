import { disableNetwork } from "firebase/firestore"
import { useFormikContext } from "formik"

interface UpdateButtonProps {
    editLink: boolean
}

const UpdateInfoButton = ({ editLink }: UpdateButtonProps) => {
    
    const { dirty, isSubmitting } = useFormikContext()

    let disableButton = !dirty && !editLink

    return (
        <div>
            <button 
                type="submit"
                disabled={disableButton}
                className={`rounded-xl py-2 px-4 ${!disableButton ? "border-2 border-black hover:bg-[#0075FF] hover:text-white" : "border-2 border-slate-400 text-slate-400"}`}
                title={`${disableButton ? "Nothing to Save, No changes have been made" : ""}`}
            >
                Save Info
            </button>
        </div>
    )
}

export default UpdateInfoButton
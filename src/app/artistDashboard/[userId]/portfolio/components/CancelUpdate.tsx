import { useFormikContext } from "formik"

interface CancelButtonProps {
    setIsEdit: Function,
}

const CancelUpdateButton = ({ setIsEdit }: CancelButtonProps) => {
    
    const { dirty, isSubmitting } = useFormikContext()
    

    const handleCancel = () => {
        setIsEdit(false)
    }

    return (
        <div>
            <button 
                onClick={handleCancel}
                type='button'
                className="rounded-xl py-2 px-4 border-2 border-black hover:bg-[#282828] hover:text-white"
                title={`${dirty ? "Changes will be lost" : ""}`}
            >
                Cancel Edit
            </button>
        </div>
    )
}

export default CancelUpdateButton
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
                className="rounded-lg py-2 px-4 border-2 border-black hover:border-red-600 hover:text-red-600"
                title={`${dirty ? "Changes will be lost" : ""}`}
            >
                Cancel Edit
            </button>
        </div>
    )
}

export default CancelUpdateButton

interface AwardProgressBarProps {
  completed: number,
  bgcolor: string
}

const AwardProgressBar = (props: AwardProgressBarProps) => {
    
    const { bgcolor, completed } = props

    return (
      <div className="h-[28px] w-[100%] bg-[#e0e0de] rounded-xl">
        <div className={`h-[100%] w-[50%] bg-[${bgcolor}] rounded-xl text-right mt-2`}> 
          <span className="p-2 text-white font-bold">{`${(completed / 4) * 100}%`}</span>
        </div>
      </div>
    )
}

export default AwardProgressBar
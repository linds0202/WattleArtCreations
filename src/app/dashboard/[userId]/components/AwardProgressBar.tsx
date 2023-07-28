

const AwardProgressBar = (props) => {
    
    const { bgcolor, completed } = props
    
    console.log('completed: ', completed)
    
    return (
      <div className="h-[20px] w-[100%] bg-[#e0e0de] rounded-xl">
        <div className={`h-[100%] w-[${completed}%] bg-[${bgcolor}] rounded-xl text-right`}>
          <span className="p-5 text-white font-bold">{`${completed}%`}</span>
        </div>
      </div>
    )
}

export default AwardProgressBar
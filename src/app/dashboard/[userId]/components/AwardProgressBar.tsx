import { useCategoriesContext } from "@/app/context/CategoriesContext"
import { Reward } from "../page"

interface AwardProgressBarProps {
  completed: number,
  bgcolor: string,
  reward: Reward
}

const AwardProgressBar = ({ completed, bgcolor, reward }: AwardProgressBarProps) => {
  const { categories } = useCategoriesContext()
  const completedPercent = reward.level === 0 ? 'hidden' : `w-[${(completed / 10) * 100}%]`
  
  return (
    <div className="h-[34px] w-[100%] bg-[#e0e0de] rounded-xl relative">
      <div className={`${completedPercent} h-[100%] bg-[${bgcolor}] ${reward.level !== 5 ? 'rounded-l-xl' : 'rounded-xl'} text-right mt-2`}> 

        {reward.level !== 0 && <span className='xl:hidden pr-2 text-xs md:text-sm lg:text-xs text-white font-bold'>{`L${reward.level}`}</span>}
        {reward.level !== 0 && <span className='hidden xl:block pr-2 text-white font-bold'>{`Level ${reward.level}`}</span>}
      </div>
      <p className="absolute top-[70%] left-[0%] text-xs">|</p>
      <p className="absolute top-[70%] left-[10%] text-xs">|</p>
      <p className="absolute top-[70%] left-[20%] text-xs">|</p>
      <p className="absolute top-[70%] left-[30%] text-xs">|</p>
      <p className="absolute top-[70%] left-[40%] text-xs">|</p>
      <p className="absolute top-[70%] left-[50%] text-xs">|</p>
      <p className="absolute top-[70%] left-[60%] text-xs">|</p>
      <p className="absolute top-[70%] left-[70%] text-xs">|</p>
      <p className="absolute top-[70%] left-[80%] text-xs">|</p>
      <p className="absolute top-[70%] left-[90%] text-xs">|</p>
      <p className="absolute top-[70%] left-[100%] text-xs">|</p>


      {/* Labeled as percentage of discount */}
      <p className="absolute top-[120%] -left-[0%] text-sm lg:text-xs xl:text-base">0%</p>
      <p className="absolute top-[120%] left-[9%] text-sm lg:text-xs xl:text-base">{Math.trunc(categories.customizer.rewardsDiscounts[0] * 100)}%</p>
      <p className="absolute top-[120%] left-[29%] text-sm lg:text-xs xl:text-base">{Math.trunc(categories.customizer.rewardsDiscounts[1] * 100)}%</p>
      <p className="absolute top-[120%] left-[49%] text-sm lg:text-xs xl:text-base">{Math.trunc(categories.customizer.rewardsDiscounts[2] * 100)}%</p>
      <p className="absolute top-[120%] left-[69%] text-sm lg:text-xs xl:text-base">{Math.trunc(categories.customizer.rewardsDiscounts[3] * 100)}%</p>
      <p className="absolute top-[120%] left-[98%] text-sm lg:text-xs xl:text-base">{Math.trunc(categories.customizer.rewardsDiscounts[4] * 100)}%</p>
    </div>
  )
}

export default AwardProgressBar
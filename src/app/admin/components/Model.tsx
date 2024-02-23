import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page"
import { ModelData } from "./ModelList"
import { useState } from "react"
import { updateModel } from "@/app/firebase/firestore";

interface ModelProps {
    model: ModelData,
    user: UserData | null
}

const Model = ({model, user}: ModelProps) => {

  const [complete, setComplete] = useState(model.portraitComplete)
  const [ordered, setOrdered] = useState(model.ordered)

  const handleSelect = async (e: any) => {
    const newComplete = e.target.value === 'Yes' ? true : false
    await updateModel(model.uid, newComplete, user?.displayName, "complete")
    setComplete(newComplete)
  }

  const handleSelectOrdered = async (e: any) => {
    const newOrdered = e.target.value === 'Yes' ? true : false
    await updateModel(model.uid, newOrdered, user?.displayName, "ordered")
    setOrdered(newOrdered)
  }


  return (
    <>
        <tr className="h-[75px] text-center">
            <td className="px-2">{model.uid}</td>
            <td className="px-2">{model.portraitId}</td>
            <td className="px-2">{model.customerId}</td>
            <td className="px-2">{model.customerName}</td>
            <td className="px-2">{new Date(model.creationDate.seconds * 1000).toLocaleDateString("en-US")}</td>
            
            <td className="px-2">
              <div className="w-full flex justify-center items-center">
                <select value={complete ? 'Yes' : 'No'} onChange={handleSelect} className="w-1/2 border-b-2 border-black leading-tight outline-none">
                    <option>Yes</option>
                    <option>No</option>
                </select>
              </div>
            </td>
            
            <td className="px-2">
              <div className="w-full flex justify-center items-center">
                <select value={ordered ? 'Yes' : 'No'} onChange={handleSelectOrdered} className="w-3/4 border-b-2 border-black leading-tight outline-none">
                    <option>Yes</option>
                    <option>No</option>
                </select>
              </div>
            </td>
            
            <td className="px-2">{model.admin}</td>
        </tr>
    </>
  )
}

export default Model
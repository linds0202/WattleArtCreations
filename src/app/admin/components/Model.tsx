import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page"
import { ModelData } from "./ModelList"

interface ModelProps {
    model: ModelData,
    user: UserData | null
}

const Model = ({model, user}: ModelProps) => {
  return (
    <div className="border border-[#282828] rounded-xl my-4 p-4">
      <p>{model.id}</p>
      <p>{model.portraitId}</p>
      <p>{model.customerId}</p>
      <p>{new Date(model.creationDate.seconds * 1000).toLocaleDateString("en-US")}</p>
      <p>{model.portraitComplete ? 'Complete' : 'Incomplete'}</p>
      <p>{model.delivered ? 'Delievered' : 'Not Delivered'}</p>
    </div>
  )
}

export default Model
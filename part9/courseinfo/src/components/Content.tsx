import { CoursePart } from "../types"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
 return <div>
  {courseParts.map(part => <p key={part.name}>{part.name} has {part.exerciseCount} exercises</p>)}
 </div>
}

export default Content
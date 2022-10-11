import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
 switch (part.type) {
  case "normal": {
   return <div>
    <h4>
     {part.name} {part.exerciseCount}
    </h4>
    <p> {part.description} </p>
   </div>
  }
  case "submission": {
   return <div>
    <h4> {part.name} {part.exerciseCount} </h4>
    <p> {part.description} </p>
    <p> submit to {part.exerciseSubmissionLink} </p>
   </div>
  }
  case "groupProject": {
   return <div>
    <h4> {part.name} {part.exerciseCount} </h4>
    <p> project exercises {part.groupProjectCount} </p>
   </div>
  }
  case "special": {
   return <div>
    <h4> {part.name} {part.exerciseCount} </h4>
    <p> {part.description} </p>
    <p> required skills: {part.requirements.join(', ')} </p>
   </div>
  }
  default: {
   const _exhaustiveCheck: never = part
   return _exhaustiveCheck;
  }
 }
}


export default Part
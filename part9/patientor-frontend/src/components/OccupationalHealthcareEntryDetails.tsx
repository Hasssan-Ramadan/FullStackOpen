import { FC } from "react";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryDetails: FC<{ entry: OccupationalHealthcareEntry, diagnosis: Diagnosis[] | undefined }> = ({ entry, diagnosis }) => {
 return <div style={{ border: '1px solid #ccc', padding: '10px' }}>
  <p style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
   {entry.date}
   <WorkIcon />
   {entry.employerName}
  </p>
  <p style={{ margin: '10px' }}>{entry.description}</p>
  {
   entry.diagnosisCodes && diagnosis &&
   <ul style={{ margin: '10px' }}>
    {
     entry.diagnosisCodes.map(code => <li key={code}>
      {code} {diagnosis.find(diagnose => diagnose.code === code)?.name}
     </li>)
    }
   </ul>
  }
  <p style={{ margin: '10px' }}>diagnose by {entry.specialist}</p>
 </div>;
};

export default OccupationalHealthcareEntryDetails;
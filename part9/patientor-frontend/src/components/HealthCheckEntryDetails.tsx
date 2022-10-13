import { FC } from "react";
import { Diagnosis, HealthCheckEntry } from "../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const HealthCheckEntryDetails: FC<{ entry: HealthCheckEntry, diagnosis: Diagnosis[] | undefined }> = ({ entry, diagnosis }) => {
 return <div style={{ border: '1px solid #ccc', padding: '10px' }}>
  <p style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
   {entry.date}
   <HealthAndSafetyIcon />
   {entry.healthCheckRating}
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

export default HealthCheckEntryDetails;
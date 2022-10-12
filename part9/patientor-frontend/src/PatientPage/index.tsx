import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
 const [patient, setPatient] = useState<Patient>();
 const [notFound, setNotFound] = useState<boolean>(false);
 const [{ patients }, dispatch] = useStateValue();
 const { patientId } = useParams<{ patientId: string }>();

 useEffect(() => {
  if (patientId && !patient) {
   if (patients[patientId]?.ssn) {
    setPatient(patients[patientId]);
   } else {
    axios.get(`${apiBaseUrl}/patients/${patientId}`).then(res => {
     if (res.data) {
      dispatch(updatePatient(res.data as Patient));
     }
     else {
      setNotFound(true);
     }
    }).catch(error => console.error(error.message));
   }
  }
 });

 if (notFound)
  return <p>Patient not found.</p>;

 if (!patient)
  return <p>Loading...</p>;

 return (
  <div>
   <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
   <p>ssn: {patient.ssn}</p>
   <p>occupation: {patient.occupation}</p>
  </div>
 );
};

export default PatientPage;

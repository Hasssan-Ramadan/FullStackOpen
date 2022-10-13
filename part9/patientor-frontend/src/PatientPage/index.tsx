import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "../components/EntryDetails";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [{ patients }, dispatch] = useStateValue();
  const { patientId } = useParams<{ patientId: string }>();
  const [diagnosis, setdiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    if (patientId && !patient) {
      if (patients[patientId]?.ssn) {
        setPatient(patients[patientId]);
      } else {
        axios.get(`${apiBaseUrl}/patients/${patientId}`)
          .then(res => {
            if (res.data) {
              dispatch(updatePatient(res.data as Patient));
            }
            else {
              setNotFound(true);
            }
          })
          .catch(error => console.error(error.message));
      }
    }
  });

  useEffect(() => {
    axios.get(`${apiBaseUrl}/diagnoses`)
      .then(res => setdiagnosis(res.data as Diagnosis[]))
      .catch(error => console.error(error.message));
  }, []);

  if (notFound)
    return <p>Patient not found.</p>;

  if (!patient)
    return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />)}
    </div>
  );
};

export default PatientPage;

import { FC } from "react";
import { Diagnosis, Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDetails: FC<{ entry: Entry, diagnosis: Diagnosis[] | undefined }> = ({ entry, diagnosis }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnosis={diagnosis} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnosis={diagnosis} />;
    default:
      const _exhaustivCheck: never = entry;
      return _exhaustivCheck;
  }
};

export default EntryDetails;
import { Link } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export interface ScanLogProps {
  scanName: string;
  url: string;
  timestamp: string;
}

export default function LogTab(props: ScanLogProps) {
  return (
    <div>
      {props.scanName}
      {props.url}
      {props.timestamp}
      <Link to={`/logs/${props.scanName}`}> View </Link>
      <Link
        to={BACKEND_URL + `/api/htmlinfo/?scanname=${props.scanName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Detailed Report
      </Link>
    </div>
  );
}

import { Link } from "@remix-run/react";

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
    </div>
  );
}

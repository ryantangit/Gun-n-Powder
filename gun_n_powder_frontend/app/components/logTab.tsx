import { Link } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export interface ScanLogProps {
  scanName: string;
  url: string;
  timestamp: string;
}


const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "Invalid timestamp";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function LogTab(props: ScanLogProps) {
  const formattedTimestamp = formatTimestamp(props.timestamp);
  const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'  // Stack content vertically
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between', // Spread items across the row
    alignItems: 'center'            // Vertically align items to the center
  },
  timestamp: {
    marginLeft: 'auto'             // Push the timestamp to the right
  },
  links: {
    marginTop: '10px'              // Space between the timestamp and the links
  }
};
return (
  <div style={styles.container}>
    <div style={styles.header}>
      <span>[{props.scanName}]&nbsp;&nbsp;</span>
      <span> {props.url}</span>
      <span style={styles.timestamp}>{formattedTimestamp}</span>
    </div>
    <div style={styles.links}>
      <Link to={`/logs/${props.scanName}`} className="hover:text-blue-500">View Log &nbsp;&nbsp;</Link>
      <Link
        to={BACKEND_URL + `/api/htmlinfo/?scanname=${props.scanName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500"
      >
        Detailed Report &nbsp;&nbsp;
      </Link>
      <Link to={`/ai/${props.scanName}`} className="hover:text-blue-500">AI Insight</Link>
    </div>
  </div>
);
}

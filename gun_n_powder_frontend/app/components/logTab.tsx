import { Link } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export interface ScanLogProps {
  scanName: string;
  url: string;
  timestamp: string;
}

export default function LogTab(props: ScanLogProps) {
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
      <span style={styles.timestamp}>{props.timestamp}</span>
    </div>
    <div style={styles.links}>
      <Link to={`/logs/${props.scanName}`} className="hover:text-blue-500">View Log &nbsp;&nbsp;</Link>
      <Link
        to={BACKEND_URL + `/api/htmlinfo/?scanname=${props.scanName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500"
      >
        Detailed Report
      </Link>
    </div>
  </div>
);
}

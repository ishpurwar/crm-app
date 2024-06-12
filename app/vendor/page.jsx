'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
export default withPageAuthRequired(function Vendor() {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch communication logs
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleSend = async () => {
    if (!selectedLog) {
      alert('Please select a log to send');
      return;
    }

    try {
      const response = await axios.post('/api/vendor', { logId: selectedLog });
      setStatus(`Status updated to: ${response.data.log.status}`);
    } catch (error) {
      console.error('Error sending log:', error);
      setStatus('Failed to send log');
    }
  };

  return (
    <div>
      <h1>Vendor Page</h1>
      <div className='w-[300px]'>
      <div className='w-[300px]'>
        <label htmlFor="logSelect">Select Communication Log:</label>
        <select id="logSelect" value={selectedLog} onChange={(e) => setSelectedLog(e.target.value)}>
          <option className="dark:bg-black" value="">Select a log</option>
          {logs.map((log) => (
            <option key={log._id} value={log._id}>
              {log.message} - {log.status}
            </option>
          ))}
        </select>
      </div>
      </div>
      <Button onClick={handleSend}>Send</Button>
      {status && <p>{status}</p>}
    </div>
  );
}
)
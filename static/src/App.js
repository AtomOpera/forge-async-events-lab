import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [data, setData] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const sendMessageToQueueViaIndex = () => {
    // sends a message to the queue 
    // and returns the job ID needed to know the queue status
    invoke('sendMessageToQueue', { example: 'my-invoke-variable' }).then(setJobId);
  };

  const getQueueStatusViaIndex = () => {
    invoke('getQueueStatus', { jobId }).then(setQueueStatus);
  };

  return (
    <div>
      <button onClick={sendMessageToQueueViaIndex}>Send message to queue</button>
      <button onClick={getQueueStatusViaIndex}>Get status of queue</button>
      <h3>data: {data ? data : 'Loading...'}</h3>
      <h3>queueMessage: {jobId ? jobId : 'Loading...'}</h3>
      <h3>queueStatus: {queueStatus ? JSON.stringify(queueStatus) : 'Loading...'}</h3>
    </div>
  );
}

export default App;

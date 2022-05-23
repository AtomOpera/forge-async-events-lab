import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [data, setData] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // To be run just the first time the component loads
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    if (!jobId) invoke('sendMessageToQueue', { example: 'my-invoke-variable' }).then(setJobId);
  }, []);

  useEffect(() => {
    console.log('jobId', jobId);
    console.log('queueStatus?.success', queueStatus?.success);
    if (!jobId || queueStatus?.success === 1) return () => clearInterval(interval);
    const interval = setInterval(() => {
      if (queueStatus?.success === 1) clearInterval(interval);
      invoke('getQueueStatus', { jobId }).then(setQueueStatus).then(setCount(count => count + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId, queueStatus]);

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
      <h3>jobId: {jobId ? jobId : 'Loading...'}</h3>
      <h3>queueStatus: {queueStatus ? JSON.stringify(queueStatus) : 'Loading...'}</h3>
      <h3>count: {count ? count : 'Loading...'}</h3>
    </div>
  );
}

export default App;

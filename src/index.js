import Resolver from '@forge/resolver';
import { Queue } from '@forge/events';

const queue = new Queue({ key: 'queue-name' });
const resolver = new Resolver();

resolver.define('getText', (req) => {
    // console.log(req);

    return 'Hello world!';
});

resolver.define('sendMessageToQueue', async (req) => {
    console.log(req);
    const jobId = await queue.push('hello world');
    return jobId;
});

resolver.define('getQueueStatus', async (req) => {
    console.log(req);
    const jobId = req.payload.jobId;
    console.log('jobId', jobId);
    const jobProgress = queue.getJob(jobId);
    console.log('jobProgress', jobProgress);
    const response = await jobProgress.getStats();
    const jsonRes = await response.json();
    console.log('jsonRes', jsonRes);
    const { success, inProgress, failed } = await response.json();
    return jsonRes;
});

export const handler = resolver.getDefinitions();


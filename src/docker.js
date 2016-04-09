import Docker from 'dockerode-promise';


// see dockerode readme on how to configure docker connection
// https://github.com/apocas/dockerode#getting-started
const docker = new Docker();


export default docker;

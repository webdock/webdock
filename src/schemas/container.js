import Schema from 'jsonapi-helper';

import { formatImageId } from '../utils/images';


const portsHelper = (obj) => {
  const ports = obj.NetworkSettings.Ports;
  if (ports === undefined || ports === null) {
    return ports;
  }

  return Object.keys(ports).map(sourcePort => {
    return {
      source: sourcePort,
      destination: ports[sourcePort],
    };
  });
}


const containerSchema = new Schema({
  id: 'Id',
  type: 'containers',
  attributes: {
    name: 'Name',
    image: (obj) => formatImageId(obj.Image),
    status: (obj) => obj.State.Status,
    created: 'Created',
    command: 'Path',
    ports: portsHelper,
  },
});

export default containerSchema;

import Schema from 'jsonapi-helper';

import imageSchema from './image';
import { formatImageId } from '../utils/images';


const portsHelper = (obj) => {
  const ports = obj.NetworkSettings.Ports;
  if (ports === undefined || ports === null) {
    return ports;
  }

  return Object.keys(ports).map(sourcePort => ({
    source: sourcePort,
    destination: ports[sourcePort],
  }));
};


const containerSchema = new Schema({
  id: 'Id',
  type: 'containers',
  attributes: {
    name: 'Name',
    status: (obj) => obj.State.Status,
    created: 'Created',
    command: 'Path',
    ports: portsHelper,
  },
  relationships: {
    image: {
      id: (obj) => formatImageId(obj.Image),
      schema: imageSchema,
      included: false,
    },
  },
});

export default containerSchema;

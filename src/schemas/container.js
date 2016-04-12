import Schema from 'jsonapi-helper';

import { formatImageId } from '../utils/images';


const containerSchema = new Schema({
  id: 'Id',
  type: 'containers',
  attributes: {
    name: 'Name',
    image: (obj) => formatImageId(obj.Image),
    status: (obj) => obj.State.Status,
    created: 'Created',
    command: 'Path',
    ports: (obj) => obj.NetworkSettings.Ports,
  },
});

export default containerSchema;

import Schema from 'jsonapi-helper';

import { formatImageId } from '../utils/images';


const containerSchema = new Schema({
  id: 'Id',
  type: 'containers',
  attributes: {
    names: 'Names',
    image: (obj) => obj.Image.match(/sha256\:/) ? '<none>' : obj.Image,
    imageId: (obj) => formatImageId(obj.ImageID),
    status: 'Status',
    created: 'Created',
    command: 'Command',
    ports: 'Port',
  },
});

export default containerSchema;

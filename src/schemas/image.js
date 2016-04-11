import Schema from 'jsonapi';

import { formatImageId } from '../utils/images';


const imageSchema = new Schema({
  id: (obj) => formatImageId(obj.Id),
  type: 'images',
  attributes: {
    parentId: (obj) => formatImageId(obj.ParentId || ''),
    repoTags: 'RepoTags',
    repoDigests: 'RepoDigests',
    created: 'Created',
    size: 'Size',
    virtualSize: 'VirtualSize',
    labels: 'Labels',
  },
});

export default imageSchema;

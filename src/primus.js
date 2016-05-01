import Primus from 'primus';
import multiplex from 'primus-multiplex';

import { server } from './app';


const primus = new Primus(server);
primus.use('multiplex', multiplex);
primus.library();

export default primus;

import {Request} from './Request';

const Maps = {
    geocode: (q) => Request('get', `/api/maps?q=${q}`)
}

export default Maps;
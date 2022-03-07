import {Request} from './Request';

const Maps = {
    geocode: (q) => Request('get', `/maps?q=${q}`)
}

export default Maps;
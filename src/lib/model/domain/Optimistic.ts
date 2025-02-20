import { v4 as uuid } from 'uuid';

export class Optimistic {
    static getTempId() {
        return `templocal-${uuid()}`;
    }
}

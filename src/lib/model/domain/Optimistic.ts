import { v4 as uuid } from 'uuid';

export enum OptimisticType {
    Create = 'Create',
    Update = 'Update',
}

export interface IOptimistic {
    optimisticLocal?: OptimisticType;
}

export class Optimistic {
    static getTempId() {
        return `templocal-${uuid()}`;
    }
}

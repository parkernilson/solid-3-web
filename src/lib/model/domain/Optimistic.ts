export enum OptimisticType {
    Create = 'Create',
    Update = 'Update',
}

export interface Optimistic {
    optimisticLocal?: OptimisticType;
}
import type { IEntry } from './Entry';

// TODO: delete me!
export type EntryUpsert = Omit<IEntry, 'id'> & Partial<Pick<IEntry, 'id'>>;

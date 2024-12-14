import type { IEntry } from './Entry';

export type EntryUpsert = Omit<IEntry, 'id'> & Partial<Pick<IEntry, 'id'>>;

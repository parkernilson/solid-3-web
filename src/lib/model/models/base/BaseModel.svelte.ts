export abstract class BaseModel {
    abstract load(): Promise<void>;
}
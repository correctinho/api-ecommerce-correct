import { Uuid } from "../../ValueObjects/uuid.vo";

export abstract class RepositoryInterface<T> {
    abstract create(entity: T): Promise<void>;
    abstract update(entity: T): Promise<void>;
    abstract find(id: Uuid): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
}
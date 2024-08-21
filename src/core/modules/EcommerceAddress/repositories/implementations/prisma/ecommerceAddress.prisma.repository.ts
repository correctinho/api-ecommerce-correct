import { Uuid } from "../../../../../@shared/ValueObjects/uuid.vo";
import { EcommerceAddressEntity } from "../../../entities/ecommerceAddress.entity";
import { IEcommerceAddressRepository } from "../../ecommerceAddress.repository";

export class EcommerceAddressPrismaRepository implements IEcommerceAddressRepository{
    create(entity: EcommerceAddressEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: EcommerceAddressEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: Uuid): Promise<EcommerceAddressEntity | null> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<EcommerceAddressEntity[]> {
        throw new Error("Method not implemented.");
    }

}
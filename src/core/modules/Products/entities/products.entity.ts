import { Uuid } from "../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../errors/custom.error";
import { newDateF } from "../../../util/date";

export type ProductProps = {
    uuid?: Uuid
    product_category_uuid: Uuid
    name: string
    description?: string | null
    price: number
    stock: number
    is_active?: boolean
    created_at?: string
    updated_at?: string
}

export type ProductCreateCommand = {
    product_category_uuid: Uuid
    name: string
    description?: string | null
    price: number
    stock: number
    is_active?: boolean
}

export class ProductEntity {
    _uuid: Uuid
    _product_category_uuid: Uuid
    _name: string
    _description: string | null
    _price: number
    _stock: number
    _is_active: boolean
    _created_at: string
    _updated_at: string

    constructor(props: ProductProps){
        this._uuid = props.uuid ?? new Uuid()
        this._product_category_uuid = props.product_category_uuid
        this._name = props.name
        this._description = props.description ?? null
        this._price = props.price
        this._stock = props.stock
        this._is_active = props.is_active ?? true
        this._created_at = props.created_at ?? newDateF(new Date)
        this._updated_at = props.updated_at ?? newDateF(new Date)
        this.validate()
    }

    validate(){
        if (!this._name) throw new CustomError("Name is required", 400);
        if (this._price < 0) throw new CustomError("Price cannot be negative", 400);
        if (this._stock < 0) throw new CustomError("Stock cannot be negative", 400);
    }

    get uuid(): Uuid {
        return this._uuid;
    }

    get product_category_uuid(): Uuid {
        return this._product_category_uuid;
    }

    get name(): string {
        return this._name;
    }

    get description(): string | null {
        return this._description;
    }

    get price(): number {
        return this._price;
    }

    get stock(): number {
        return this._stock;
    }

    get created_at(): string {
        return this._created_at;
    }

    get updated_at(): string {
        return this._updated_at;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeDescription(description: string) {
        this._description = description;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    changeStock(stock: number) {
        this._stock = stock;
        this.validate();
    }

    activate() {
        this._is_active = true;
    }

    deactivate() {
        this._is_active = false;
    }

    toJSON() {
        return {
            uuid: this._uuid,
            product_category_uuid: this._product_category_uuid,
            name: this._name,
            description: this._description,
            price: this._price,
            stock: this._stock,
            is_active: this._is_active,
            created_at: this._created_at,
            updated_at: this._updated_at
        }
    }

    static create(props: ProductCreateCommand) {
        return new ProductEntity(props);
    }
}
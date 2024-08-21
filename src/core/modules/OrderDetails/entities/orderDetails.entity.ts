import { Uuid } from "../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../errors/custom.error";
import { newDateF } from "../../../util/date";

export type OrderDetailsProps = {
    uuid?: Uuid
    orderheader_uuid: Uuid
    product_uuid: Uuid
    quantity: number
    subtotal: number
    created_at?: string
}

export type OrderDetailsCreateCommand = {
    orderheader_uuid: Uuid
    product_uuid: Uuid
    quantity: number
    subtotal: number
}

export class OrderDetailsEntity {
    _uuid: Uuid
    _orderheader_uuid: Uuid
    _product_uuid: Uuid
    _quantity: number
    _subtotal: number
    _created_at: string

    constructor(props: OrderDetailsProps){
        this._uuid = props.uuid ?? new Uuid()
        this._orderheader_uuid = props.orderheader_uuid
        this._product_uuid = props.product_uuid
        this._quantity = props.quantity
        this._subtotal = props.subtotal
        this._created_at = props.created_at ?? newDateF(new Date)
        this.validate()
    }

    validate(){
        if (this._quantity <= 0) throw new CustomError("Quantity must be greater than zero", 400);
        if (this._subtotal < 0) throw new CustomError("Subtotal cannot be negative", 400);
    }

    get uuid(): Uuid {
        return this._uuid;
    }

    get orderheader_uuid(): Uuid {
        return this._orderheader_uuid;
    }

    get product_uuid(): Uuid {
        return this._product_uuid;
    }

    get quantity(): number {
        return this._quantity;
    }

    get subtotal(): number {
        return this._subtotal;
    }

    get created_at(): string {
        return this._created_at;
    }

    changeQuantity(quantity: number) {
        this._quantity = quantity;
        this.validate();
    }

    changeSubtotal(subtotal: number) {
        this._subtotal = subtotal;
        this.validate();
    }

    toJSON() {
        return {
            uuid: this._uuid,
            orderheader_uuid: this._orderheader_uuid,
            product_uuid: this._product_uuid,
            quantity: this._quantity,
            subtotal: this._subtotal,
            created_at: this._created_at
        }
    }

    static create(props: OrderDetailsCreateCommand) {
        return new OrderDetailsEntity(props);
    }
}
import { Uuid } from "../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../errors/custom.error";
import { newDateF } from "../../../util/date";

export type OrderHeaderProps = {
    uuid?: Uuid
    user_info_uuid: Uuid
    order_date: string
    total_amount: number
    shipping_address_uuid: Uuid
    billing_address_uuid: Uuid
    transaction_uuid: Uuid
    created_at?: string
}

export type OrderHeaderCreateCommand = {
    user_info_uuid: Uuid
    order_date: string
    total_amount: number
    shipping_address_uuid: Uuid
    billing_address_uuid: Uuid
    transaction_uuid: Uuid
}

export class OrderHeaderEntity {
    _uuid: Uuid
    _user_info_uuid: Uuid
    _order_date: string
    _total_amount: number
    _shipping_address_uuid: Uuid
    _billing_address_uuid: Uuid
    _transaction_uuid: Uuid
    _created_at: string

    constructor(props: OrderHeaderProps) {
        this._uuid = props.uuid ?? new Uuid()
        this._user_info_uuid = props.user_info_uuid
        this._order_date = props.order_date
        this._total_amount = props.total_amount
        this._shipping_address_uuid = props.shipping_address_uuid
        this._billing_address_uuid = props.billing_address_uuid
        this._transaction_uuid = props.transaction_uuid
        this._created_at = props.created_at ?? newDateF(new Date)
        this.validate()
    }

    validate() {
        if (this._total_amount < 0) throw new CustomError("Total amount cannot be negative", 400);
    }

    get uuid(): Uuid {
        return this._uuid;
    }

    get user_info_uuid(): Uuid {
        return this._user_info_uuid;
    }

    get order_date(): string {
        return this._order_date;
    }

    get total_amount(): number {
        return this._total_amount;
    }

    get shipping_address_uuid(): Uuid {
        return this._shipping_address_uuid;
    }

    get billing_address_uuid(): Uuid {
        return this._billing_address_uuid;
    }

    get transaction_uuid(): Uuid {
        return this._transaction_uuid;
    }

    get created_at(): string {
        return this._created_at;
    }

    changeTotalAmount(total_amount: number) {
        this._total_amount = total_amount;
        this.validate();
    }

    toJSON() {
        return {
            uuid: this._uuid,
            user_info_uuid: this._user_info_uuid,
            order_date: this._order_date,
            total_amount: this._total_amount,
            shipping_address_uuid: this._shipping_address_uuid,
            billing_address_uuid: this._billing_address_uuid,
            transaction_uuid: this._transaction_uuid,
            created_at: this._created_at
        }
    }

    static create(props: OrderHeaderCreateCommand) {
        return new OrderHeaderEntity(props);
    }
}
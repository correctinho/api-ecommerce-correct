import { Uuid } from "../../../@shared/ValueObjects/uuid.vo";

export type EcommerceAddressProps = {
    uuid?: Uuid
    line1: string
    line2?: string
    line3?: string
    postal_code: string
    city: string
    state: string
    country: string
    userInfo_uuid: Uuid
}

export type EcommerceAddressCreateCommand = {
    line1: string
    line2?: string
    line3?: string
    postal_code: string
    city: string
    state: string
    country: string
    userInfo_uuid: Uuid
}

export class EcommerceAddressEntity {
    _uuid: Uuid
    _line1: string
    _line2: string | null
    _line3: string | null
    _postal_code: string
    _city: string
    _state: string
    _country: string
    _userInfo_uuid: Uuid

    constructor(props: EcommerceAddressProps) {
        this._uuid = props.uuid ?? new Uuid()
        this._line1 = props.line1
        this._line2 = props.line2 ?? null
        this._line3 = props.line3 ?? null
        this._postal_code = props.postal_code
        this._city = props.city
        this._state = props.state
        this._country = props.country
        this._userInfo_uuid = props.userInfo_uuid
    }

    get uuid(): Uuid {
        return this._uuid;
    }

    get line1(): string {
        return this._line1;
    }

    get line2(): string | null {
        return this._line2;
    }

    get line3(): string | null {
        return this._line3;
    }

    get postal_code(): string {
        return this._postal_code;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get country(): string {
        return this._country;
    }

    get userInfo_uuid(): Uuid {
        return this._userInfo_uuid;
    }

    toJSON() {
        return {
            uuid: this._uuid,
            line1: this._line1,
            line2: this._line2,
            line3: this._line3,
            postal_code: this._postal_code,
            city: this._city,
            state: this._state,
            country: this._country,
            userInfo_uuid: this._userInfo_uuid
        }
    }

    static create(props: EcommerceAddressCreateCommand) {
        return new EcommerceAddressEntity(props);
    }
}
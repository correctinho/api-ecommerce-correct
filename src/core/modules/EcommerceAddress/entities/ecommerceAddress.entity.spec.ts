import { Uuid } from "../../../@shared/ValueObjects/uuid.vo"
import { EcommerceAddressEntity } from "../entities/ecommerceAddress.entity"

describe("Unit test EcommerceAddress entity", () => {
    it("Should create ecommerce address", async () => {
        const input = {
            line1: "123 Main St",
            line2: "Apt 4",
            line3: "Floor 2",
            postal_code: "12345",
            city: "Anytown",
            state: "Anystate",
            country: "Anycountry",
            userInfo_uuid: new Uuid()
        }

        const address = EcommerceAddressEntity.create(input)

        expect(address._line1).toBe("123 Main St")
        expect(address._postal_code).toBe("12345")
        expect(address._city).toBe("Anytown")
        expect(address._state).toBe("Anystate")
        expect(address._country).toBe("Anycountry")
    })
})
import { Uuid } from "../../../@shared/ValueObjects/uuid.vo"
import { OrderHeaderEntity } from "../entities/orderHeader.entity"

describe("Unit test OrderHeader entity", () => {
    it("Should throw an error if total amount is negative", async () => {
        const input = {
            user_info_uuid: new Uuid(),
            order_date: "2024-08-16",
            total_amount: -100,
            shipping_address_uuid: new Uuid(),
            billing_address_uuid: new Uuid(),
            transaction_uuid: new Uuid()
        }

        expect(() => {
            OrderHeaderEntity.create(input)
        }).toThrow("Total amount cannot be negative")
    })

    it("Should create order header", async () => {
        const input = {
            user_info_uuid: new Uuid(),
            order_date: "2024-08-16",
            total_amount: 200,
            shipping_address_uuid: new Uuid(),
            billing_address_uuid: new Uuid(),
            transaction_uuid: new Uuid()
        }

        const orderHeader = OrderHeaderEntity.create(input)

        expect(orderHeader._total_amount).toBe(200)
        expect(orderHeader._order_date).toBe("2024-08-16")
        expect(orderHeader._created_at).toBeTruthy()
    })

    it("Should update total amount", async () => {
        const input = {
            user_info_uuid: new Uuid(),
            order_date: "2024-08-16",
            total_amount: 200,
            shipping_address_uuid: new Uuid(),
            billing_address_uuid: new Uuid(),
            transaction_uuid: new Uuid()
        }
        
        const orderHeader = OrderHeaderEntity.create(input)
        orderHeader.changeTotalAmount(300)
        expect(orderHeader._total_amount).toBe(300)
    })
})
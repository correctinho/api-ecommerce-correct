import { Uuid } from "../../../@shared/ValueObjects/uuid.vo"
import { OrderDetailsEntity } from '../entities/orderDetails.entity'

describe("Unit test OrderDetails entity", () => {
    it("Should throw an error if quantity is less than or equal to zero", async () => {
        const input = {
            orderheader_uuid: new Uuid(),
            product_uuid: new Uuid(),
            quantity: 0,
            subtotal: 100
        }

        expect(() => {
            OrderDetailsEntity.create(input)
        }).toThrow("Quantity must be greater than zero")
    })

    it("Should throw an error if subtotal is negative", async () => {
        const input = {
            orderheader_uuid: new Uuid(),
            product_uuid: new Uuid(),
            quantity: 5,
            subtotal: -100
        }

        expect(() => {
            OrderDetailsEntity.create(input)
        }).toThrow("Subtotal cannot be negative")
    })

    it("Should create order details", async () => {
        const input = {
            orderheader_uuid: new Uuid(),
            product_uuid: new Uuid(),
            quantity: 5,
            subtotal: 100
        }

        const orderDetails = OrderDetailsEntity.create(input)

        expect(orderDetails._quantity).toBe(5)
        expect(orderDetails._subtotal).toBe(100)
        expect(orderDetails._created_at).toBeTruthy()
    })

    it("Should update order quantity", async () => {
        const input = {
            orderheader_uuid: new Uuid(),
            product_uuid: new Uuid(),
            quantity: 5,
            subtotal: 100
        }
        
        const orderDetails = OrderDetailsEntity.create(input)
        orderDetails.changeQuantity(10)
        expect(orderDetails._quantity).toBe(10)
    })

    it("Should update order subtotal", async () => {
        const input = {
            orderheader_uuid: new Uuid(),
            product_uuid: new Uuid(),
            quantity: 5,
            subtotal: 100
        }
        
        const orderDetails = OrderDetailsEntity.create(input)
        orderDetails.changeSubtotal(200)
        expect(orderDetails._subtotal).toBe(200)
    })
})
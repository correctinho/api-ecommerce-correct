import { Uuid } from '../../../../@shared/ValueObjects/uuid.vo';
import { ProductEntity } from '../products.entity';

describe('Unit test Product entity', () => {
  it('Should throw an error if name is missing', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: '',
      description: 'Product description',
      price: 100,
      stock: 10,
    };

    expect(() => {
      ProductEntity.create(input);
    }).toThrow('Name is required');
  });

  it('Should throw an error if price is negative', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: 'Product description',
      price: -100,
      stock: 10,
    };

    expect(() => {
      ProductEntity.create(input);
    }).toThrow('Price cannot be negative');
  });

  it('Should throw an error if stock is negative', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: 'Product description',
      price: 100,
      stock: -10,
    };

    expect(() => {
      ProductEntity.create(input);
    }).toThrow('Stock cannot be negative');
  });

  it('Should create product', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: 'Product description',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);

    expect(product._name).toBe('Product name');
    expect(product._description).toBe('Product description');
    expect(product._price).toBe(100);
    expect(product._stock).toBe(10);
    expect(product._is_active).toBe(true);
    expect(product._created_at).toBeTruthy();
  });

  it('Should update product name', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: '',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);
    product.changeName('New name');
    expect(product._name).toBe('New name');
    expect(product._description).toBeFalsy();
    expect(product._is_active).toBe(true);
  });

  it('Should update product description', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: '',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);
    product.changeDescription('New description');
    expect(product._name).toBe('Product name');
    expect(product._description).toBe('New description');
    expect(product._is_active).toBe(true);
  });

  it('Should update product price', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: 'Product description',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);
    product.changePrice(150);
    expect(product._price).toBe(150);
  });

  it('Should update product stock', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: 'Product description',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);
    product.changeStock(20);
    expect(product._stock).toBe(20);
  });

  it('Should deactivate product', async () => {
    const input = {
      product_category_uuid: new Uuid(),
      name: 'Product name',
      description: '',
      price: 100,
      stock: 10,
    };

    const product = ProductEntity.create(input);
    product.deactivate();
    expect(product._name).toBe('Product name');
    expect(product._description).toBeFalsy();
    expect(product._is_active).toBe(false);
  });
});

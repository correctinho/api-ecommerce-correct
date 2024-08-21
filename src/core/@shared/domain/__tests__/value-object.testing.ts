// import { ValueObject } from '../../ValueObjects/domain/value-objects';

// class StringValueObject extends ValueObject {
//   constructor(readonly value: string) {
//     super();
//   }
// }

// class ComplexValueObject extends ValueObject {
//   constructor(
//     readonly prop1: string,
//     readonly prop2: number,
//   ) {
//     super();
//   }
// }

// describe('ValueObject Unit Tests', () => {
//   it('Should be equals', () => {
//     const vo1 = new StringValueObject('test');
//     const vo2 = new StringValueObject('test');

//     expect(vo1.equals(vo2)).toBe(true);

//     const complexVo1 = new ComplexValueObject('test', 1);
//     const complexVo2 = new ComplexValueObject('test', 1);

//     expect(complexVo1.equals(complexVo2)).toBe(true);
//   });

//   it('Should not be equals', () => {
//     const vo1 = new StringValueObject('test1');
//     const vo2 = new StringValueObject('test2');

//     expect(vo1.equals(vo2)).toBe(false);
//     expect(vo1.equals(null as any)).toBe(false);
//     expect(vo1.equals(undefined as any)).toBe(false);

//     const complexVo1 = new ComplexValueObject('test1', 1);
//     const complexVo2 = new ComplexValueObject('test2', 2);

//     expect(complexVo1.equals(complexVo2)).toBe(false);
//     expect(complexVo1.equals(null as any)).toBe(false);
//     expect(complexVo1.equals(undefined as any)).toBe(false);
//   });
// });

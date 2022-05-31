import { Calculator } from './calculator';

describe('Unit tests for Calculator', () => {
  describe('Test suite for multiply', () => {
    it('#multiply should return nine when a is 3 and b is 3', () => {
      // Arrange
      const calc = new Calculator();
      // Act
      const rta = calc.multiply(3, 3);
      // Assert
      expect(rta).toBe(9);
    });

    it('#multiply should return four when a is 2 and b is 2', () => {
      // Arrange
      const calc = new Calculator();
      // Act
      const rta = calc.multiply(2, 2);
      // Assert
      expect(rta).toBe(4);
    });
  });

  describe('General tests', () => {
    it('Should return 2 when a is 4 and b is 2', () => {
      // Arrange
      const calc = new Calculator();
      // Act and Assert
      expect(calc.divide(4, 2)).toBe(2);
    });

    it('Some matchers', () => {
      const name = 'Javier';
      let name2;

      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy();
      expect(1 + 3 === 3).toBeFalsy();

      expect(444).toBeGreaterThan(10);
      expect(2).toBeLessThan(5);

      expect('123456').toMatch(/123/);

      expect(['Apples', 'Oranges', 'Pears']).toContain('Oranges');
    });
  });

  describe('Suite tests for divide', () => {
    it('#divide should return null when b is 0', () => {
      const calc = new Calculator();
      expect(calc.divide(7, 0)).toBeNull();
    });
  });
});

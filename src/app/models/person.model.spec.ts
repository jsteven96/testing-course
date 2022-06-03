import { Person } from './person.model';

describe('Tests for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Javier', 'Perez', 25, 75, 1.7);
  });

  it('attrs', () => {
    expect(person.age).toEqual(25);
    expect(person.height).toEqual(1.7);
    expect(person.weight).toEqual(75);
  })

  describe('Tests for calcIMC', () => {
    it('should return a string down', () => {
      person.weight = 40;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Down');
    });

    it('should return a string normal', () => {
      person.weight = 60;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Normal');
    });

    it('should return a string Overweight', () => {
      person.weight = 80;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Overweight');
    });

    it('should return a string Overweight level 1', () => {
      person.weight = 90;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Overweight level 1');
    });

    it('should return a string Overweight level 2', () => {
      person.weight = 95;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Overweight level 2');
    });

    it('should return a string Overweight level 3', () => {
      person.weight = 130;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Overweight level 3');
    });

    it('should return a string Not Found', () => {
      person.weight = -2;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toEqual('Not found');
    });

    it('should return an empty string', () => {
      person.weight = 0;
      person.height = 1.65;
      const rta = person.calcIMC();
      expect(rta).toBe('');
    });
  });
});

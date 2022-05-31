import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();   
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('My value');
    });
  });

  describe('Tests for setValue', () => {
    it('should change the value property', () => {
      expect(service.getValue()).toBe('My value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Tests for promises', () => {
    // First aproach
    it('should return promise value when it is resolve with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('Promise value');
        doneFn();
      });
    });

    it('should return promise value when it is resolve in an async method', async() => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('Promise value');
    });
  });

  describe('Tests for promises', () => {
    it('should return observable value', () => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
      });
    })
  });
});

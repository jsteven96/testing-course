import { ValueService } from './value.service';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let service: MasterService;

  /*
  beforeEach(() => {
    service = new MasterService();
  });*/ 

  it('should return a value from another service', () => {
    const valueService = new ValueService();
    service = new MasterService(valueService);
    expect(service.getValue()).toBe('My value');
  });

  it('should return a value from a fake object', () => {
    const fake = {getValue: () => {return 'fake from obj'}};
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  });

  xit('should call getValue of the dependency', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
    expect(masterService.getValue()).toBe('fake value');
  });
});

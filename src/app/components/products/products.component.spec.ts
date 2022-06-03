import { generateManyProducts } from './../../models/product.mock';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/product.service';
import { ProductComponent } from './../product/product.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { of, defer } from 'rxjs';
import { ValueService } from 'src/app/services/value.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;
  let productsMock: Product[] = generateManyProducts(3);

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: productServiceSpy,
        },
        {
          provide: ValueService,
          useValue: valueServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should create', () => {
    productsService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOnInit
    expect(component).toBeTruthy();
    expect(productsService.getAll).toHaveBeenCalled();
  });

  describe('Tests for getAllProducts', () => {
    it('should return a list of products from service', () => {
      productsService.getAll.and.returnValue(of(productsMock));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.products.length).toEqual(6);
    });

    it('should change loading status to success', fakeAsync(() => {
      productsService.getAll.and.returnValue(
        defer(() => Promise.resolve(productsMock))
      );
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); // Ejecuta todo lo pendiente por resolverse de forma asíncrona
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change loading status to error', fakeAsync(() => {
      productsService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // Ejecuta todo lo pendiente por resolverse de forma asíncrona

      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });

  describe('Tests for callProducts', () => {
    it('should call a promise', async () => {
      productsService.getAll.and.returnValue(of(productsMock));
      fixture.detectChanges(); //ngOnInit
      const mockMsg = 'my value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      await component.callPromise();
      fixture.detectChanges();
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show my mock string in <p> when btn was clicked', fakeAsync(() => {
      productsService.getAll.and.returnValue(of(productsMock));
      fixture.detectChanges(); //ngOnInit
      const mockMsg = 'my value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const debugBtn: DebugElement = fixture.debugElement.query(
        By.css('.btn-promise')
      );
      debugBtn.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const debugP: DebugElement = fixture.debugElement.query(By.css('p.rta'));
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(debugP.nativeElement.textContent).toEqual(mockMsg);
    }));
  });
});

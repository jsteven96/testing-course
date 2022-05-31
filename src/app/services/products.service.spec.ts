import { TokenService } from './token.service';
import { TokenInterceptor } from './../interceptor/token.interceptor';
import {
  generateManyProducts,
  generateOneProduct,
} from './../models/product.mock';
import { environment } from './../../environments/environment';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('Products Service', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        ProductsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);

      productService.getAllSimple().subscribe((res: Product[]) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
    });
  });

  describe('Tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);

      productService.getAll().subscribe((res: Product[]) => {
        expect(res.length).toEqual(mockData.length);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
      ];

      productService.getAll().subscribe((res: Product[]) => {
        expect(res[0].taxes).toBe(19);
        expect(res[1].taxes).toBe(38);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
    });

    it('should return special results depending on the price', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];

      productService.getAll().subscribe((res: Product[]) => {
        expect(res[0].taxes).toBe(38);
        expect(res[1].taxes).toBe(0);
        expect(res[2].taxes).toBe(0);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const limit = 10;
      const offset = 3;
      const mockData: Product[] = generateManyProducts();

      productService.getAll(10, 3).subscribe((res: Product[]) => {
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      );
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('Tests for create', () => {
    it('should return a new product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'title',
        price: 100,
        images: ['img'],
        description: 'cha',
        categoryId: 12,
      };

      productService.create({ ...dto }).subscribe((res) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Tests for update', () => {
    it('should update a product', (doneFn) => {
      const id = 1;
      const mockData = {
        ...generateOneProduct(),
        id: `${id}`,
      };
      const dto: UpdateProductDTO = {
        title: 'title',
        price: 100,
        images: ['img'],
        description: 'cha',
        categoryId: 12,
      };

      productService.update(`${id}`, { ...dto }).subscribe((res) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${id}`
      );
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Tests for delete', () => {
    it('should delete a product', (doneFn) => {
      const id = 1;
      const mockData = true;

      productService.delete(`${id}`).subscribe((res) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${id}`
      );
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('Tests for getOne', () => {
    it('should return a product', (doneFn) => {
      const id = 1;
      const mockData = generateOneProduct();

      productService.getOne(`${id}`).subscribe((res) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products/${id}`
      );
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });
  });

  it('should return el producto no existe when the status code is 404', (doneFn) => {
    const id = 1;
    const msgError = '404 message';
    const mockError = {
      status: HttpStatusCode.NotFound,
      statusText: msgError,
    };

    productService.getOne(`${id}`).subscribe({
      error: (error) => {
        expect(error).toEqual('El producto no existe');
        doneFn();
      },
    });

    const req = httpController.expectOne(
      `${environment.API_URL}/api/v1/products/${id}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(msgError, mockError);
  });

  describe('Interceptor test', () => {
    it('should intercept any request', (doneFn) => {
      spyOn(tokenService, 'getToken').and.returnValue('123');
      const mockData: Product[] = generateManyProducts(3);

      productService.getAllSimple().subscribe((res: Product[]) => {
        expect(res).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/v1/products`
      );
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
  });
});

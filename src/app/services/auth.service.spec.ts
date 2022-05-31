import { environment } from './../../environments/environment.prod';
import { Auth } from './../models/auth.model';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService, AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Tests for login', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '121',
      };
      const email = 'nico@gmail.com';
      const pwd = '121';

      authService.login(email, pwd).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/auth/login`
      );
      req.flush(mockData);
    });

    it('should call tokenService', (doneFn) => {
      const mockData: Auth = {
        access_token: '121',
      };
      const email = 'nico@gmail.com';
      const pwd = '121';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, pwd).subscribe((data) => {
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);
        doneFn();
      });

      const req = httpController.expectOne(
        `${environment.API_URL}/api/auth/login`
      );
      req.flush(mockData);
    });
  });
});

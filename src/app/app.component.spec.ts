import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { NEVER, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: '<span>Login</span>'
})

class MockLoginComponent { }

describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let UtilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged'
  ]);

  UtilSvcSpy.isLogged = new Subject<boolean>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: MockLoginComponent,
          },
        ]),
        MatToolbarModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: UtilService, useValue: UtilSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it('should create app with user logged in', () => {
    UtilSvcSpy.getToken.and.returnValue('token');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(true);
  });

  it('should create app with user is not logged in', () => {
    UtilSvcSpy.getToken.and.returnValue('token');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(false);
  });

  it('should recieve isLogged form UtilSvc true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    UtilSvcSpy.isLogged.next(true);
    expect(app.isLogged).toBeTrue();
  });

  it('should recieve isLogged form UtilSvc false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    UtilSvcSpy.isLogged.next(false);
    expect(app.isLogged).toBeFalse();
  });

  it('should logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(UtilSvcSpy.deleteToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['login']);
  });
});

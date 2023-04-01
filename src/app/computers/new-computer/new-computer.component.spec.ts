import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;
  let service: ComputerService;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputer']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should computer save', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion'
      } as Computer;
      const obs = service.saveComputer(comp);
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);
      request.flush({});
    }
  ));

  it('should http computer save with error', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const comp = {
        brand: 'HP',
        model: 'Pavilion'
      } as Computer;
      const obs = service.saveComputer(comp);
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error saving computer');
        }
      });

      const request = httMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);
      request.error(new ErrorEvent('error saving computer'));
    }
  ));

});

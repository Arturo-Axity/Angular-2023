import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { ComputersComponent } from './computers.component';
import { MatTableModule } from '@angular/material/table';
import { ComputerService } from '../services/computer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputers', 'deleteComputer']
  );

  computerSvcSpy.getComputers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

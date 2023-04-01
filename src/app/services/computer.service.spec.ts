import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.length).toBe(1);
          const first = val[0];
          expect(first.id).toBe(1);
          expect(first.brand).toBe('HP');
          expect(first.model).toBe('Pavilion');
        },
      });

      const request = httMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'HP',
          model: 'Pavilion',
        },
      ]);
    }
  ));

  it('should http get error computers', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not found');
        },
      });

      const request = httMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computers not found'));
    }
  ));


  it('should http post computer save', inject(
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

  it('should http post computer save with error', inject(
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


  it('should http put computer update', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'RT-1234'
      } as Computer;
      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httMock.expectOne('http://localhost:3000/computers/1');
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http put computer update with error', inject(
    [HttpTestingController],
    (httMock: HttpTestingController) => {
      const comp = {
        id: 1,
        brand: 'Huawei',
        model: 'RT-1234'
      } as Computer;
      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error updating computer');
        },
      });

      const request = httMock.expectOne('http://localhost:3000/computers/1');
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error updating computer'));
    }
  ));

  // it('should http delete computer', inject(
  //   [HttpTestingController],
  //   (httMock: HttpTestingController) => {
  //     let comp = {
  //       id: 1
  //     } as Computer;
  //     const obs = service.deleteComputer();
  //     expect(obs instanceof Observable).toBeFalse();
  //     obs.subscribe({
  //       next: (val) => {
  //         expect(val).toBeDefined();
  //       },
  //     });

  //     const request = httMock.expectOne('http://localhost:3000/computers/1');
  //     expect(request.request.method).toBe('DELETE');
  //     expect(request.request.body).toEqual(comp);
  //     request.flush({});
  //   }
  // ));

  // it('should http get computer', inject(
  //   [HttpTestingController],
  //   (httMock: HttpTestingController) => {
  //     const comp = {
  //       id: 1,
  //       brand: 'Huawei',
  //       model: 'RT-1234'
  //     } as Computer;
  //     const obs = service.getComputer(comp);

  //     expect(obs instanceof Observable).toBeTrue();

  //     obs.subscribe({
  //       next: (val) => {
  //         expect(val).toBeDefined();
  //       },
  //     });

  //     const request = httMock.expectOne('http://localhost:3000/computers/1');
  //     expect(request.request.method).toBe('GET');

  //     request.flush([
  //       {
  //         id: 1,
  //         brand: 'HP',
  //         model: 'Pavilion',
  //       },
  //     ]);
  //   }
  // ));

});

import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from '../../services/computer.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent {
  computerId: number = 0;
  formComputer?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private computerSvc: ComputerService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
    });

    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.loadData();
        // consumir servicio
        // GET http://localhost:3000/ID
        // this.form.patchValue(OBJETO DE RESPUESTA)
        // Boton guardar
        // PATCH http://localhost:3000/ID body = objeto Computer

      },
    });
  }

  loadData() {
    if (this.computerId != 0) {
      this.computerSvc.getComputer(this.computerId).subscribe({
        next: (item) => {
          this.formComputer?.patchValue(item);
        },
        error: (err) => {
          alert('Lo sentimos');
        },
      });
    } else {
      alert('No existe el objeto');
    }
  }

  saveComputer() {
    let data = this.formComputer?.value as Computer;
    data.id = this.computerId;

    this.computerSvc.saveComputer(data).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Lo sentimos, ocurrio un error');
      },
    });
  }
  // ngOnInit(): void {
  //   this.formComputer?.patchValue(this.data);
  // }

  // updateComputer() {
  //   if (this.formComputer?.valid) {
  //     if (this.data) {
  //       this.computerSvc
  //         .updateComputer(this.data.id, this.formComputer.value)
  //         .subscribe({
  //           next: (val: any) => {
  //             alert('Computer actualizado');

  //           },
  //           error: (err: any) => {
  //             console.log(err);
  //           },
  //         });
  //     }

  //   }
  // }


}

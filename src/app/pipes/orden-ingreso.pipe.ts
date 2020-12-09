import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    console.log(items)
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        console.log(-1)
        return -1;
      }
      else {
        console.log(1)
        return 1;
      }

    });
  }

}

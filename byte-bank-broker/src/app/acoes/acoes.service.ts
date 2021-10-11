import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcaoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined
    return this.http
       .get<AcaoesAPI>('http://localhost:3000/acoes', { params })
       .pipe(
         tap((valor) => console.log(valor)),
         pluck('payload'),
         tap(valor => console.log(valor)),
         map((acoes) => 
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
          )
        );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1
    } else if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
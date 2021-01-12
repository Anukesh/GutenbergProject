import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(private http: HttpClient
  ) { }

   public getBookList(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((result:any)=>{return result;
      },
      catchError(this.handleError)
      )
    )
  }

  private handleError(err: Response){
    console.log('failed with error: ', err);
    return throwError(err);    
  }
}

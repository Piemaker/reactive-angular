import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

// notice that it's not injected at the root level, to have multiple instances for different parts of the app
// and prevent blocking the entire app
@Injectable()
export class LoadingService {
  // should be private to prevent other parts application to emit it
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  constructor() {
    console.log("Loading service created 🟢...")
  }

  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    // concatMap executes the next observable when the previous one completes in sequential order
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }
  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}

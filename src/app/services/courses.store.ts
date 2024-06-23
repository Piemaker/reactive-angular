import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { MessagesService } from "../messages/messages.service";
import { LoadingService } from "../loading/loading.service";

// this is a singleton service and won't have access to the LoadingService or MessagesService
// that's why they need to be provided in the root module

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
    private loadingService: LoadingService
  ) {
    this.loadAllCourses().subscribe();
  }
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  loadAllCourses(): Observable<Course[]> {
    const loadCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((data) => data["payload"]),
      catchError((error) => {
        this.messageService.showErrors("Could not load courses");
        console.log("error", error);
        // returns an error observable
        return throwError(error);
      }),
      tap((courses) => this.coursesSubject.next(courses)),
      shareReplay()
    );

    return this.loadingService.showLoaderUntilComplete(loadCourses$);
  }

  filterCourses(category: string) {
    return this.courses$.pipe(
      map((courses) => {
        return courses.filter((course) => course.category === category);
      })
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    // Optimistic update
    this.coursesSubject.next(
      this.coursesSubject.value.map((course) => {
        let newCourse = course;
        if (course.id === courseId) {
          newCourse = { ...course, ...changes };
        }
        return newCourse;
      })
    );
    const updateCourses$ = this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(
        catchError((error) => {
          this.messageService.showErrors("Could not update course");
          console.log("error", error);
          // returns an error observable
          return throwError(error);
        }),
        shareReplay()
      );
    return updateCourses$;
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}
  // Key notes:
  // 1- Services return only observables
  // 2- Services don't contain state
  loadAllCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>("/api/courses")
      .pipe(map((data) => data["payload"]));
  }
}

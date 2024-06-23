import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { CoursesService } from "../services/CoursesService";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseService: CoursesService,
    private loadingService: LoadingService,
    private messageService: MessagesService,
    private coursesStore : CoursesStore
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }
  // reloadCourses() {
  //   const courses$ = this.courseService.loadAllCourses().pipe(
  //     map((courses) => {
  //       return courses.toSorted(sortCoursesBySeqNo);
  //     }),
  //     catchError((error) => {
  //       this.messageService.showErrors("Could not load courses");
  //       console.log("error", error);
  //       // returns an error observable
  //       return throwError(error);
  //     })
  //   );
  //   const loadCourses$ = this.loadingService.showLoaderUntilComplete(courses$);
  //   this.beginnerCourses$ = loadCourses$.pipe(
  //     map((courses) =>
  //       courses.filter((course) => course.category === "BEGINNER")
  //     )
  //   );
  //   this.advancedCourses$ = loadCourses$.pipe(
  //     map((courses) =>
  //       courses.filter((course) => course.category === "ADVANCED")
  //     )
  //   );
  // }

  reloadCourses = () => {
    this.beginnerCourses$ = this.coursesStore.filterCourses("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterCourses("ADVANCED");
  }
}

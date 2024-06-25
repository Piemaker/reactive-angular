import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  catchError,
} from "rxjs/operators";
import {
  merge,
  fromEvent,
  Observable,
  concat,
  throwError,
  combineLatest,
} from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/CoursesService";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// OnPush change detection is triggered only when the component's input/Observable are changed
export class CourseComponent implements OnInit {
  courseData$: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    const COURSE_ID = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.coursesService
      .getCourseById(COURSE_ID)
      .pipe(startWith(null));
    const lessons$ = this.coursesService
      .getCourseLessons(COURSE_ID)
      .pipe(startWith([]));
    // combineLatest emits the latest values from each observables
    // however it has to wait for both observable to emit their initial values
    // to emit either of the values as soon as they are ready we have to set them to startWith(null)
    this.courseData$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return { course, lessons };
      })
    );
  }
}

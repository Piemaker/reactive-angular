import {
  AfterViewInit,
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
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/CoursesService";

@Component({
  selector: "course",
  templateUrl: "./search-lessons.component.html",
  styleUrls: ["./search-lessons.component.css"],
})
export class SearchLessonsComponent implements OnInit {
  lessonsList$: Observable<Lesson[]>;
  // this has the befit of being destroyed when the component is destroyed
  activeLesson: Lesson = null;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {}

  handleSearch(search: string) {
    this.lessonsList$ = this.coursesService.searchLessons(search);
  }
  setActiveLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }
  backToSearch() {
    this.activeLesson = null;
  }
}

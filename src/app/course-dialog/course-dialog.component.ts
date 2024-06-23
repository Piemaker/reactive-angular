import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { CoursesService } from "../services/CoursesService";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messageService: MessagesService,
    private coursesStore: CoursesStore,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    // this will only trigger the loading component in the course dialog component
    // the instance of the loading component in the app component doesn't have access to this service
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    // const changes = this.form.value;
    // const saveCourse$ = this.loadingService
    //   .showLoaderUntilComplete(
    //     this.coursesService.saveCourse(this.course.id, changes)
    //   )
    //   .pipe(
    //     catchError((error) => {
    //       this.messageService.showErrors("Could not update course");
    //       console.log("error", error);
    //       // returns an error observable
    //       return throwError(error);
    //     })
    //   );

    // notice how we have to use the loadingService here instead of the store
    // because the store uses the global Loading component
    const saveCourse$ = this.loadingService.showLoaderUntilComplete(
      this.coursesStore.saveCourse(this.course.id, this.form.value)
    );

    saveCourse$.subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

  close() {
    this.dialogRef.close();
  }
}

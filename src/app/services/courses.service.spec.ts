/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { CoursesService } from "./CoursesService";

describe("Service: Courses", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
    });
  });

  it("should ...", inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));
});

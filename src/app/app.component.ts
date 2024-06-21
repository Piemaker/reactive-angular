import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading/loading.service";

// LoadingService is provided for app component and all its children
// shouldn't be provided to the app module otherwise it will have on instance to the entire app
// notice course dialog is not a direct descendant to the app component so it need to have a loading service provided to it

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [LoadingService],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {}
}

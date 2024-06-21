import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading/loading.service";

// LoadingService is provided for app component and all its children

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

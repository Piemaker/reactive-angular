import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../model/message";
import { tap } from "rxjs/operators";
import { MessagesService } from "./messages.service";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  isShowMessage = false;
  errors$: Observable<string[]> = this.messageService.errors$.pipe(
    tap(() => {(this.isShowMessage = true)})
  );

  constructor(public messageService: MessagesService) {}

  ngOnInit() {}

  onClose() {
    this.isShowMessage = false;
  }
}

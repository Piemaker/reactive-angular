import { Injectable } from "@angular/core";

// notice that it's not injected at the root level, to have multiple instances for different parts of the app
// and prevent blocking the entire app
@Injectable()
export class LoadingService {
  constructor() {}
}

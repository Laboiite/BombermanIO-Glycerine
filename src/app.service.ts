import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  public getWelcome(): string {
    return "Welcome on the Glycerine side of the app !";
  }
}

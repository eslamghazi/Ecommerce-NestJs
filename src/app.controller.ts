import { Controller, Get, Redirect } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/")
  @Redirect("/swagger", 302)
  public getHome() {
    return "Your app is working"; // Fallback response (not typically reached due to redirect)
  }
}
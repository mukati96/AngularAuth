import { Component } from '@angular/core';
import { Profile } from "../profile/profile";
import { Navbar } from "../../shared/component/navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../../shared/component/sidebar/sidebar";

@Component({
  selector: 'app-layout',
  imports: [Navbar, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}

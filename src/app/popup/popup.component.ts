import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{
  items: string [] = [];
    ngOnInit(): void {
      this.items = Array(100).fill("User name");
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: false,
  
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  ngOnInit() {
    // اگر Sidebar در index.html هست، آن را مخفی کنیم
    const sidebar = document.querySelector('.sidebar-links');
    if (sidebar) sidebar.setAttribute('style', 'display:none;');
  }
}
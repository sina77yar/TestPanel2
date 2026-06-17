import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  standalone: false,
  
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent implements OnInit {
  ngOnInit() {
    // اگر Sidebar در index.html هست، آن را مخفی کنیم
    const sidebar = document.querySelector('.sidebar-links');
    if (sidebar) sidebar.setAttribute('style', 'display:none;');
  }
}
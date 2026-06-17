import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class Sidebar implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      ['sidebar-menu.js', 'sidebar-pin.js', 'script.js'].forEach(file => {
        const script = document.createElement('script');
        script.src = `assets/js/${file}`;
        document.body.appendChild(script);
      });
    }, 100);
  }
}
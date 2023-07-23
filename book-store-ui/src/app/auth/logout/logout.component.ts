import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private service: AuthService, private toastrService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.logout().subscribe(({ message }) => {
      sessionStorage.clear();
      localStorage.clear();
      this.toastrService.success(message);
      this.router.navigate(['login'], { relativeTo: this.route.parent });
    });
  }
}

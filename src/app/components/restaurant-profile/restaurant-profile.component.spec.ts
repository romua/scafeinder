import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantProfileComponent } from './restaurant-profile.component';
import { GetCafesService } from '../../services/getcafes/getcafes.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

describe('RestaurantProfileComponent', () => {
  let component: RestaurantProfileComponent;
  let fixture: ComponentFixture<RestaurantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantProfileComponent ],
      imports: [ HttpModule, RouterTestingModule, NgbModule, AngularOpenlayersModule ],
      providers: [ GetCafesService, NgbTabsetConfig, UserService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

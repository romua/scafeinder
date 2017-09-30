import { Component, OnInit, Input } from '@angular/core';
import { ICafe } from '../../models/cafe.interface';
import { ShortcutPipe } from '../../pipes/shortcut.pipe';
import { GetCafesService } from '../../services/getcafes/getcafes.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  restaurants: ICafe[] = [];
  categoryFilter: String[] = [];
  cuisineFilter: String[] = [];
  featureFilter: String[] = [];
  p = 1;

  constructor(private getCafesService: GetCafesService, private filterService: FilterService) {

    this.filterService.updatedCategoryFilter
      .subscribe((filter: String[]) => {
        this.categoryFilter = filter;
      }
    );
    this.filterService.updatedCuisineFilter
      .subscribe((filter: String[]) => {
        this.cuisineFilter = filter;
      }
    );
    this.filterService.updatedFeatureFilter
      .subscribe((filter: String[]) => {
        this.featureFilter = filter;
      }
    );
  }

  ngOnInit() {
    this.getCafesService.getAllCafes()
      .subscribe(
        (restaurants: ICafe[]) => {
          this.restaurants = restaurants;
        },
        (error) => console.log(error)
      );
    this.filterService.currentCafes.subscribe(data => this.restaurants = data);
  }

}

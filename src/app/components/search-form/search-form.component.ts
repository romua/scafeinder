import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { company, dayHours, UserQuery } from './data-search-form';
import { DatepickerComponent } from '../bootstrap/datepicker/datepicker.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})

export class SearchFormComponent implements OnInit {
  company: Array<number>;
  dayHours: any;
  model: NgbDateStruct;
  searchform: FormGroup;
  userQuery = new UserQuery(2, '2017-10-10', '13:00', 'Cosa Nostra');

  constructor(private _formBuilder: FormBuilder) {
    this._buildForm();
  }

  private _buildForm() {
    this.searchform = this._formBuilder.group({
      persons: this._formBuilder,
      date: this._formBuilder,
      time: this._formBuilder,
      placeName: this._formBuilder,
    });
  }

  ngOnInit() {
    this.company = company;
    this.dayHours = dayHours;
    this.dayHours = this.showLeftHours();
  }

  get diagnostic() {
    return JSON.stringify(this.userQuery);
  }

  showLeftHours(day = 'today') {
    let hoursStr;
    const currentDate = new Date();
    const currentHours = currentDate.getHours();

    if (currentHours < 10) {
      hoursStr = `0${currentHours}`;
    } else {
      hoursStr = currentHours.toString();
    }

    if (day === 'future') {
      return dayHours;
    }

    return (this.dayHours.map((item) => {
      if (item.hour > hoursStr) {
        return {hour: item.hour, minute: item.minute};
      }
    })).slice((currentHours + 1) * 2);
  }

  public checkSelectedDate(date: NgbDateStruct) {
    if (date) {
      const now = new Date();
      this.model = date;
      if (now.getFullYear() < this.model.year || (now.getMonth() + 1) < this.model.month || now.getDate() < this.model.day) {
        this.userQuery.date = `${this.model.year}-${this.model.month}-${this.model.day}`;
        return this.dayHours = this.showLeftHours('future');
      }
      return this.dayHours = this.showLeftHours();
    }
  }
}
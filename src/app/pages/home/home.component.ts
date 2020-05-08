import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  array = [2, 3, 10, 15, 26, 35, 50, 63, 82];
  result: any = null;
  title = 'test1';
  Q1Form: FormGroup;
  Q2Form: FormGroup;

  arrayX = [['X1Y1']];
  XIndexValue = 1;
  FinalData: { [k: string]: any } = {}
  YIndexValue = 1;
  orderedData: any = {}


  constructor(
    private http: HttpClient,
    private router: Router,
    private _apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.Q1Form = new FormGroup({
      index: new FormControl(null, Validators.required),
    });
    this.Q2Form = this.fb.group({
      Data: this.fb.array([this.Data]),
    });
  }

  get Data(): FormGroup {
    return this.fb.group({ X: this.fb.array([this.X]) });
  }

  get X(): FormGroup {
    return this.fb.group({ Y: '' });
  }

  addX() {
    (this.Q2Form.get('Data') as FormArray).push(this.Data);
  }

  addY(xItem) {
    xItem.get('X').push(this.X);
  }

  onClick() {
    let multiplier = +this.Q1Form.value.index
    if (this.Q1Form.value.index % 2 == 0) {
      this.result = multiplier * multiplier - 1
    } else {
      this.result = multiplier * multiplier + 1
    }
  }

  // onAddComponentX() {
  //   this.XIndexValue += 1;
  //   let XValue = "X" + this.XIndexValue + "Y1"
  //   this.arrayX.push([XValue])

  // }

  // onAddComponentY(i) {
  //   let X = i + 1
  //   let XValue = 'X' + X
  //   let Y = this.arrayX[i].length + 1
  //   let YValue = XValue + 'Y' + Y
  //   this.arrayX[i].push(YValue)
  //   console.log(YValue)
  // }

  onClickSave(i, y) {
    let XNumber = i + 1
    let YNumber = y + 1
    let XValue = "X" + XNumber;
    let YValue = 'Y' + YNumber;
    let value = this.Q2Form.value['Data'][i]['X'][y]['Y']
    if (!this.FinalData[XValue]) {
      this.FinalData[XValue] = {}
    }
    this.FinalData[XValue][YValue] = value
    const newVariable = {}
    const anotherVariable = this.FinalData
    Object.keys(anotherVariable).sort().forEach(function (keyX) {
      Object.keys(anotherVariable[keyX]).sort().forEach(function (keyY) {
        if (!newVariable[keyX]) {
          newVariable[keyX] = {}
        }
        newVariable[keyX][keyY] = anotherVariable[keyX][keyY];
      })
    });
    this.orderedData = newVariable
    // console.log(newVariable)
    this._apiService.saveData(this.FinalData).subscribe()
  }
}

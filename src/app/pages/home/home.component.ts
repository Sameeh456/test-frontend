import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  array = [2, 3, 10, 15, 26, 35, 50, 63, 82]
  result: any = null;
  title = 'test1';
  Q1Form: FormGroup;
  Q2Form: FormGroup;

  arrayX = [['X1Y1']]
  XIndexValue = 1
  Data: {} = {
    X1: {
      Y1: null
    }
  }
  YIndexValue = 1

  constructor(
    private http: HttpClient,
    private router: Router,
    private _apiService: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.Q1Form = new FormGroup({
      'index': new FormControl(null, Validators.required)
    })
    this.Q2Form = new FormGroup({
      'textFromY': new FormControl(null, Validators.required)
    })
  }

  onClick() {
    // console.log("Hello")
    // console.log(this.Q1Form.value.index)
    if (this.Q1Form.value.index < this.array.length) {
      this.result = this.array[this.Q1Form.value.index]
    }
  }

  onAddComponentX() {
    this.XIndexValue += 1;
    let XValue = "X" + this.XIndexValue + "Y1"
    this.arrayX.push([XValue])

  }

  onAddComponentY(i) {
    let X = i + 1
    let XValue = 'X' + X
    let Y = this.arrayX[i].length + 1
    let YValue = XValue + 'Y' + Y
    this.arrayX[i].push(YValue)
    console.log(YValue)
  }

  onClickSave(i, y) {
    let XNumber = i + 1
    let YNumber = y + 1
    let XValue = "X" + XNumber;
    let YValue = 'Y' + YNumber;
    this.Data[XValue][YValue] = null;

    let value = document.getElementById(this.arrayX[i][y])['value']
    this.Data[XValue][YValue] = value
    console.log("Heloo I am in on click save")
    console.log(this.Data)

    // let message = { "Data": { 'X': XValue, 'Y': YValue, 'text': value } }
    this._apiService.saveData(this.Data).subscribe()
  }

}

import { Component, OnInit} from '@angular/core';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  result = '';
  line1 = '';
  public history1: string [] = [];
  numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', ];
  lowLine: string[] = [ '+/-', '0', '.'];
  highLine1: string[] = ['%', 'CE', 'C'];
  highLine2: string[] = ['1/x', 'x^2', 'sqrt'];
  operations: string[] = ['Backspace', '/', '*', '-', '+', '='];
  memoryButtons: string[] = ['MC', 'MR', 'M+', 'M-', 'MS', 'M'];
  public memory: string[] = [];
  private preValue = '';
  public showHistory = false;
  private curValue = '';




  addToExpression(value: string) {
    try {
      if (this.result !== '') {
        this.preValue = this.curValue;
        this.curValue = value;
      }


      if (value === 'C') {
        this.result = '';
      } else if (value === 'Backspace') {
        this.result = this.preValue !== '=' ? this.result.slice(0, -1) : this.result;
      } else if (value === '1/x') {
        this.result = (1.0 / parseFloat(this.result)).toString();
        this.saveHistory(this.result);
      }else if (value === '%') {
        console.log(this.preValue, this.result, this.curValue);
        this.result = ((parseFloat(this.result) / 100)).toString();
        this.saveHistory(this.result);
        console.log(this.preValue, this.line1, this.curValue);
      } else if (value === 'x^2') {
        this.result = (Math.pow(parseFloat(this.result), 2)).toString();
        this.saveHistory(this.result);
      }  else if (value === 'sqrt') {
        this.result = (Math.pow(parseFloat(this.result), 1 / 2)).toString();
        this.saveHistory(this.result);
      } else if (value === '+/-') {
        console.log(this.curValue, this.preValue, this.result);
        if (parseFloat(this.result) > 0) {
          this.result = '-' + this.result;
        } else {
          this.result = (this.result).toString().slice(1, this.result.length);
        }
      } else if (value === '=') {
        // tslint:disable-next-line:no-eval
        this.saveHistory(this.result + '=' + eval(this.result));
        this.line1 = this.result + '=';
        this.result = eval(this.result);



        console.log(this.history1);

      } else {
        this.line1 = '';
        this.result += value;
      }


    } catch (ExceptionInformation) {
      this.result = '';
      this.line1 = '';
      this.result = 'Invalid Operation, Press C';
    }
  }

  saveHistory(result: string){
    this.history1.push(result);
  }

  history(){
    if (this.showHistory){
      return this.showHistory = false;
    }
    return this.showHistory = true;
  }

  clearHistory(){
    this.history1 = [];
  }



}

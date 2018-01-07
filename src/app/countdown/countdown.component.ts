import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  
  ngOnChanges(changes):void {
    console.log("init value update to: ", changes.init.currentValue);
    this.startCountdown();
  }
  
  ngOnDestroy(): void {
    this.clearTimeout();
  }
  
  ngOnInit(): void {
    this.startCountdown();
  }

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number=null;
  public counter:number = 0;
  private countdownTimerRef: any = null; 

  constructor() { }

  startCountdown(){
    if(this.init && this.init>0 ){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    this.countdownTimerRef=setTimeout(() => {
      this.counter = this.counter-1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  
  processCountdown(){
    //emitimos el evento con el dato del contador real(el actual)
    this.onDecrease.emit(this.counter);
    console.log("count is ", this.counter);

    if(this.counter == 0){
      //emitimos un evento cuando el contador ha finalizado
      this.onComplete.emit();
      console.log("count end ");
    }else{
      this.doCountdown();
    }

  }

}

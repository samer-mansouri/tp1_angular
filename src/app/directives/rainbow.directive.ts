import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[rainbow]',
  standalone: true
})
export class RainbowDirective {

  private colors: string[] = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];


  @HostBinding('style.borderColor') borderColor: string = 'black';
  @HostBinding('style.color') color: string = 'white';

  constructor() { }

  @HostListener('keyup') onKeyUp() {
    this.changeColor();
  }

  private changeColor() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.color = randomColor;
    this.borderColor = randomColor;
  }

}
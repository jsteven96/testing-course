import {
  Directive,
  ElementRef,
  Input,
  OnChanges
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highlight') bgColor = '';

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    this.elementRef.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}

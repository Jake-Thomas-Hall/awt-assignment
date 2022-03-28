import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output() appClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.appClickOutside.emit(event);
    }
  }

}

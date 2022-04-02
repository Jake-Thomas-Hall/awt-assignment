import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicChildLoader]'
})
export class LoadChildDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

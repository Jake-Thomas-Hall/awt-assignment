import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 
  '[contenteditable][formControlName],' +
  '[contenteditable][formControl],' +
  '[contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true
    }
  ]
})
export class ContentEditableDirective implements ControlValueAccessor {
  

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  writeValue(value: string): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', value);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  @HostListener('input')
  onInput() {
    this.onChange(this.elementRef.nativeElement.innerHTML);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  private onTouched = () => {};

  private onChange: (value: string) => void = () => {};
}

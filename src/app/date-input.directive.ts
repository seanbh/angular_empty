import { Directive, ElementRef, HostListener, Output, EventEmitter, inject } from '@angular/core';

@Directive({
  selector: '[appDateInput]',
  standalone: true
})
export class DateInputDirective {
  @Output() statusChange = new EventEmitter<string>();
  
  private el = inject(ElementRef<HTMLInputElement>);

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart;
    
    let value = input.value;
    
    value = value.replace(/-/g, '/');
    
    value = value.replace(/[^0-9/]/g, '');
    
    const parts = value.split('/');
    if (parts.length > 3) {
      parts.splice(3);
    }
    
    const formattedParts = parts.map((part, index) => {
      if (index === 2) {
        return part.length > 4 ? part.substring(0, 4) : part;
      } else {
        return part.length > 2 ? part.substring(0, 2) : part;
      }
    });
    
    value = formattedParts.join('/');
    
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    input.value = value;
    if (cursorPosition !== null) {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    
    if (!value) {
      this.statusChange.emit('');
      return;
    }
    
    const normalizedDate = this.validateAndNormalizeDate(value);
    
    if (normalizedDate) {
      input.value = normalizedDate;
      this.statusChange.emit('');
    } else {
      this.statusChange.emit('error-invalid-date');
    }
  }

  private validateAndNormalizeDate(dateString: string): string | null {
    const parts = dateString.split('/');
    
    if (parts.length < 2 || parts.length > 3) {
      return null;
    }
    
    let month: number, day: number, year: number;
    
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        year = parseInt(parts[0]);
        month = parseInt(parts[1]);
        day = parseInt(parts[2]);
      } else {
        month = parseInt(parts[0]);
        day = parseInt(parts[1]);
        year = parseInt(parts[2]);
        
        if (year < 100) {
          year += 2000;
        }
      }
    } else {
      month = parseInt(parts[0]);
      day = parseInt(parts[1]);
      year = new Date().getFullYear();
    }
    
    if (year < 1900 || year > 2099) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || 
        date.getMonth() !== month - 1 || 
        date.getDate() !== day) {
      return null;
    }
    
    const normalizedMonth = month.toString().padStart(2, '0');
    const normalizedDay = day.toString().padStart(2, '0');
    return `${normalizedMonth}/${normalizedDay}/${year}`;
  }
}

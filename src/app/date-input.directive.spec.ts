import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DateInputDirective } from './date-input.directive';

@Component({
  template: `
    <input type="text" appDateInput (statusChange)="onStatusChange($event)" #dateInput>
  `,
  imports: [DateInputDirective]
})
class TestComponent {
  status = '';
  
  onStatusChange(status: string) {
    this.status = status;
  }
}

describe('DateInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    
    const inputDebugEl = fixture.debugElement.query(By.css('input'));
    inputEl = inputDebugEl.nativeElement;
    
    fixture.detectChanges();
  });

  describe('Input Formatting', () => {
    it('should remove non-numeric characters except forward slashes', () => {
      inputEl.value = 'abc12/34def';
      inputEl.dispatchEvent(new Event('input'));
      expect(inputEl.value).toBe('12/34');
    });

    it('should convert dashes to forward slashes', () => {
      inputEl.value = '12-34-2023';
      inputEl.dispatchEvent(new Event('input'));
      expect(inputEl.value).toBe('12/34/2023');
    });

    it('should limit input to 10 characters maximum', () => {
      inputEl.value = '12/34/20231234';
      inputEl.dispatchEvent(new Event('input'));
      expect(inputEl.value).toBe('12/34/2023');
    });

    it('should prevent more than 3 date parts', () => {
      inputEl.value = '12/34/2023/56';
      inputEl.dispatchEvent(new Event('input'));
      expect(inputEl.value).toBe('12/34/2023');
    });

    it('should truncate individual parts that exceed maximum length', () => {
      inputEl.value = '123/456/20234';
      inputEl.dispatchEvent(new Event('input'));
      expect(inputEl.value).toBe('12/45/2023');
    });
  });

  describe('Date Validation', () => {
    it('should emit empty string for valid dates', () => {
      inputEl.value = '12/25/2023';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('');
    });

    it('should emit error-invalid-date for invalid dates', () => {
      inputEl.value = '13/45/2023';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('error-invalid-date');
    });

    it('should accept empty input without validation errors', () => {
      inputEl.value = '';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('');
    });

    it('should validate month range (1-12)', () => {
      inputEl.value = '13/15/2023';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('error-invalid-date');
    });

    it('should validate year range (1900-2099)', () => {
      inputEl.value = '12/15/1899';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('error-invalid-date');
      
      inputEl.value = '12/15/2100';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('error-invalid-date');
    });
  });

  describe('Format Normalization', () => {
    it('should zero-pad single-digit months and days', () => {
      inputEl.value = '1/5/2023';
      inputEl.dispatchEvent(new Event('blur'));
      expect(inputEl.value).toBe('01/05/2023');
    });

    it('should convert two-digit years to four-digit format', () => {
      inputEl.value = '12/25/23';
      inputEl.dispatchEvent(new Event('blur'));
      expect(inputEl.value).toBe('12/25/2023');
    });

    it('should convert YYYY/MM/DD format to MM/DD/YYYY', () => {
      inputEl.value = '2023/12/25';
      inputEl.dispatchEvent(new Event('blur'));
      expect(inputEl.value).toBe('12/25/2023');
    });
  });

  describe('Edge Cases', () => {
    it('should handle leap year dates correctly', () => {
      inputEl.value = '02/29/2024';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('');
      expect(inputEl.value).toBe('02/29/2024');
    });

    it('should reject invalid leap year dates', () => {
      inputEl.value = '02/29/2023';
      inputEl.dispatchEvent(new Event('blur'));
      expect(component.status).toBe('error-invalid-date');
    });
  });
});

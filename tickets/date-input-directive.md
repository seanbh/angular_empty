# DateInput Directive

A directive that provides automatic date formatting and validation for input fields.

---

## Functionality

### Input Formatting (Real-time)
- **Character Filtering:** Removes all non-numeric characters except forward slashes (`/`).
- **Dash Conversion:** Converts dashes (`-`) to forward slashes (`/`) for consistent formatting.
- **Length Limitation:** Restricts input to maximum 10 characters (`MM/DD/YYYY` format).
- **Part Validation:** Prevents more than 3 date parts (month/day/year).
- **Part Length Control:**
  - Limits each part to appropriate lengths (4 digits for year, 2 for month/day).
  - Truncates excess characters automatically.

### Date Validation (On Blur)
- **Empty Input Handling:** Ignores validation for empty inputs.
- **Invalid Date Detection:** Uses JavaScript `Date` constructor to validate date strings.
- **Date Range Validation:**
  - Month: 1-12
  - Day: 1-31
  - Year: 1900-2099
- **Format Normalization:**
  - Zero-pads single-digit months/days (e.g., `1/5/23` → `01/05/2023`).
  - Converts two-digit years to `20xx` format (e.g., `23` → `2023`).
  - Converts `YYYY/MM/DD` format to `MM/DD/YYYY`.

### Status Emission
- **Error Status:** Emits `'error-invalid-date'` when validation fails.
- **Success Status:** Emits empty string `''` when date is valid.
- **Real-time Feedback:** Immediate validation feedback on blur event.

---

## Technical Implementation Details

### Event Handlers
- **Input Event:** Handles real-time formatting as user types.
- **Blur Event:** Performs comprehensive validation and normalization.

### Supported Date Formats
- **Input Formats:** `MM/DD/YYYY`, `M/D/YY`, `YYYY/MM/DD`, `M/D/YYYY`
- **Output Format:** Always `MM/DD/YYYY` after validation.

---

## Acceptance Criteria

### ✅ Input Formatting Requirements
- Restricts input to numeric characters and forward slashes only.
- Converts dashes to forward slashes during input.
- Limits total input length to 10 characters maximum.
- Prevents entry of more than 3 date parts (separated by slashes).
- Truncates individual parts that exceed maximum length (4 for year, 2 for month/day).
- Maintains cursor position during real-time formatting.

### ✅ Date Validation Requirements
- Validates date format on blur event (focus loss).
- Accepts empty input without validation errors.
- Detects and rejects invalid date strings using JavaScript Date validation.
- Enforces month range validation (1-12).
- Enforces day range validation (1-31).
- Enforces year range validation (1900-2099).
- Emits `'error-invalid-date'` status for invalid dates.
- Emits empty string `''` status for valid dates.

### ✅ Format Normalization Requirements
- Zero-pads single-digit months (e.g., `1` → `01`).
- Zero-pads single-digit days (e.g., `5` → `05`).
- Converts two-digit years to four-digit format (e.g., `23` → `2023`).
- Converts `YYYY/MM/DD` format to `MM/DD/YYYY` format.
- Updates input field value with normalized format after validation.

### ✅ Event Handling Requirements
- Responds to input events for real-time formatting.
- Responds to blur events for validation and normalization.
- Emits status events that can be consumed by parent components.
- Provides immediate feedback without requiring form submission.

### ✅ Integration Requirements
- Works with standard HTML input elements.
- Compatible with Angular reactive forms.
- Compatible with template-driven forms.
- Can be applied via attribute directive syntax.
- Follows Angular standalone directive patterns.

---

## Out of Scope
- Custom date format configuration
- Internationalization/localization
- Calendar picker integration
- Form validation integration beyond status emission
- Keyboard navigation enhancements
- Accessibility attributes (ARIA)

---

## Testing Requirements
- Unit tests for input formatting logic
- Unit tests for date validation logic
- Unit tests for status emission
- Integration tests with form controls
- Edge case testing (leap years, invalid dates, boundary values)
- Add a component to the version test app to display the functionality like other directives
- Add a Playwright test for the component in the version test app

---

This implementation provides a solid foundation for date input handling with automatic formatting and validation, suitable for business applications requiring consistent date entry across forms.

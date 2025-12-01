# Trapezoid Utility Backup

This file contains a backup of the trapezoid-left and trapezoid-right utilities from `app/globals.css`.

## Backup Date
Created: $(date)

## Utilities

```css
@utility trapezoid-left {
  /* Links: Konvergiert zur rechten Seite/Mitte (V-Form) */
  clip-path: polygon(0% 0%, 90% 10%, 90% 90%, 0% 100%);
}

@utility trapezoid-right {
  /* Rechts: Konvergiert zur linken Seite/Mitte (V-Form) */
  clip-path: polygon(10% 10%, 100% 0%, 100% 100%, 10% 90%);
}
```

## Original Location
Source: `app/globals.css` (lines 80-88)

## Notes
These utilities create trapezoidal clip-path shapes:
- `trapezoid-left`: Converges toward the right side/middle (V-form)
- `trapezoid-right`: Converges toward the left side/middle (V-form)


# 02. Shadcn Component Overrides (Technical/Tight)

**Role:** Frontend Architect
**Context:** Overriding Shadcn defaults to achieve a "Technical/Industrial" aesthetic with reduced rounding and tighter hit-boxes.

## 1. Button (`components/ui/button.tsx`)

**Design Goal:** Rectangular, precise, tactile.

*   **Radius:** `rounded-md` (6px) or `rounded-sm` (4px). Never `rounded-full` (except icons).
*   **Height:** Keep `h-10` or `h-11` for density.
*   **Styling:** 
    *   `font-medium`
    *   `tracking-tight`
    *   `active:translate-y-[1px]` (Mechanical click feel)

```tsx
// Variant: Outline (Technical)
"border border-input bg-background hover:bg-accent hover:text-accent-foreground"
```

## 2. Input (`components/ui/input.tsx`)

**Design Goal:** Structured data entry.

*   **Background:** `bg-secondary/50` (Very subtle grey).
*   **Border:** `border-input`.
*   **Radius:** `rounded-md` (6px).
*   **Text:** `text-sm` or `text-base` (depending on device).

## 3. Card (`components/ui/card.tsx`)

**Design Goal:** Data containment units.

*   **Shadow:** **NONE.** `shadow-none`.
*   **Border:** `border border-border`.
*   **Radius:** `rounded-lg` (6px).
*   **Spacing:** Reduce default padding. Use `p-4` instead of `p-6`.

## 4. Badge / Tag

*   **Radius:** `rounded-sm` (2px - very square).
*   **Text:** `uppercase text-[10px] tracking-wider`.
*   **Padding:** `px-1.5 py-0.5`.

## 5. Separator

*   **Color:** `bg-border`.
*   **Usage:** Use frequently to delineate sections in high-density layouts.

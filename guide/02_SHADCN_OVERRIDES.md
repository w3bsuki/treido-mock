# 02. Shadcn Component Overrides (Technical/Tight)

**Role:** Frontend Architect
**Context:** Instructions for overriding Shadcn defaults. When you install a Shadcn component, modify the code immediately to match these rules.

## 1. Button (`components/ui/button.tsx`)

**Goal:** Rectangular, precise, tactile. No "pill" shapes for default buttons.

*   **Radius:** `rounded-md` (6px).
*   **Variants:**
    *   `default`: `bg-primary text-primary-foreground shadow-none hover:opacity-90 active:scale-[0.98]`
    *   `outline`: `border border-border bg-background shadow-none hover:bg-accent hover:text-accent-foreground`
    *   `secondary`: `bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/80`
*   **Height:** `h-10` (40px) is the standard.

## 2. Input (`components/ui/input.tsx`)

**Goal:** Structured data entry.

*   **Background:** `bg-secondary` (Zinc 50). This differentiates inputs from the white cards.
*   **Border:** `border-transparent` -> Focus `border-ring`.
*   **Radius:** `rounded-md`.
*   **Font Size:** `text-base` (16px) to prevent iOS zoom.

## 3. Card (`components/ui/card.tsx`)

**Goal:** Data containment.

*   **Container:** `rounded-md border border-border bg-card text-card-foreground shadow-none`.
*   **Padding:** Remove default p-6. Use utility classes `p-4` inside the content.

## 4. Sheet / Drawer

*   **Mobile:** Use `vaul` (Drawer) style.
*   **Corner:** `rounded-t-xl`.
*   **Overlay:** `bg-black/40` backdrop blur.

## 5. Separator

*   **Color:** `bg-border`.
*   **Usage:** Use frequently to divide lists instead of massive whitespace.
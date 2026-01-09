# 03. Layout Patterns (High Density)

**Role:** UI Developer
**Context:** Implementing the "Technical Utility" layout structure.

## 1. The "Data Grid" (Product Feed)
In a high-density layout, gaps are minimized to `gap-2` (8px).

```tsx
<div className="grid grid-cols-2 gap-2 px-2 pb-safe-bottom">
  {items.map(item => (
    // Product Card
    <div className="group border border-border rounded-md bg-white overflow-hidden shadow-none active:border-zinc-400 transition-colors">
       {/* Image 1:1 Aspect Ratio */}
       <div className="aspect-square bg-secondary relative">
          <img src="..." className="object-cover" />
       </div>
       {/* Content - Compact Padding */}
       <div className="p-2 space-y-1">
          <h3 className="text-sm font-medium leading-tight truncate">Title</h3>
          <div className="text-sm font-bold">120 лв.</div>
       </div>
    </div>
  ))}
</div>
```

## 2. The "Control Bar" (Filters/Sort)
A dense horizontal strip of controls. Use `border-r` dividers between icon groups.

```tsx
<div className="flex items-center gap-2 overflow-x-auto px-4 py-2 border-b border-border bg-background no-scrollbar">
  <button className="h-8 px-3 rounded-md border border-border bg-white text-xs font-bold whitespace-nowrap shadow-sm">
    FILTERS
  </button>
  <div className="h-4 w-[1px] bg-border mx-1"></div> {/* Vertical Divider */}
  {chips.map(chip => (
    <button className="h-8 px-3 rounded-md border border-border bg-white text-xs font-medium whitespace-nowrap">
      {chip.label}
    </button>
  ))}
</div>
```

## 3. The "Property List" (Details)
Dense key-value pairs separated by borders. No rounded corners between items.

```tsx
<div className="border-y border-border divide-y divide-border bg-background">
  <div className="flex justify-between py-3 px-4">
    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Brand</span>
    <span className="text-sm font-medium">Apple</span>
  </div>
  <div className="flex justify-between py-3 px-4">
    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Condition</span>
    <span className="text-sm font-medium">New</span>
  </div>
</div>
```

## 4. The "Visual Drill-Down" Navigation (Deep Hierarchy)

This pattern solves "Vertical Fatigue" (too many rows of buttons). It transforms based on depth.

**State A: Top Level (The "Showroom")**
*   **L1 (Tabs):** Text-only tabs (e.g., Men, Women). `h-[48px]`, `border-b`.
*   **L2 (Departments):** **Large Visual Circles**.
    *   Container: `w-[72px] flex flex-col items-center`.
    *   Circle: `w-[56px] h-[56px] rounded-full bg-zinc-50 border border-zinc-200`.
    *   Icon: `w-6 h-6 stroke-[1.5] text-zinc-900`.
    *   Label: `text-[11px] font-medium text-center`.
*   **L3 (Sub-cats):** Hidden.

**State B: Drilled Down (The "Shelf")**
*   **Trigger:** Clicking an L2 Circle.
*   **Transition:** The Circle row disappears.
*   **L2 (Context):** The Circle **morphs** into a "Back Pill".
    *   Style: `rounded-full bg-zinc-900 text-white pl-2 pr-3 py-1.5`.
    *   Content: Icon + Name + 'X'.
*   **L3 (Sub-cats):** A scrollable row of Text Pills appears next to the Back Pill.
    *   Style: `rounded-full border border-zinc-200 bg-white px-3.5 py-1.5`.
    *   Active: `bg-zinc-900 text-white`.

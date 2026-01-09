# 03. Layout Patterns (High Density)

**Role:** UI Developer
**Context:** Implementing the "Technical Utility" layout structure.

## 1. The "Data Grid" (Product Feed)
In a high-density layout, gaps are minimized to `gap-2` (8px).

```tsx
<div className="grid grid-cols-2 gap-2 px-2 pb-safe-bottom">
  {items.map(item => (
    // Product Card
    <div className="group border border-border rounded-md bg-white overflow-hidden shadow-none">
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
<div className="flex items-center gap-2 overflow-x-auto px-4 py-2 border-b border-border bg-background">
  <button className="h-8 px-3 rounded-sm border border-border bg-secondary text-xs font-bold whitespace-nowrap">
    FILTERS
  </button>
  <div className="h-4 w-[1px] bg-border mx-1"></div> {/* Vertical Divider */}
  {chips.map(chip => (
    <button className="h-8 px-3 rounded-sm border border-dashed border-border text-xs font-medium whitespace-nowrap">
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
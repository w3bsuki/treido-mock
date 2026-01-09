# 🧩 COMPONENT PATTERNS

These are the "Blueprints" for complex UI elements. Copy these structures exactly.

## 1. THE "DOUBLE DECKER" NAVIGATION (Focus Mode)

**Problem:** Deep navigation (Category -> Subcategory) cramps the screen if put on one row.
**Solution:** Split into **Context Row** (Where I am) and **Options Row** (Where I can go).

```tsx
<div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
  
  {/* LEVEL 1: GLOBAL HEADER (48px) */}
  <div className="flex items-center justify-between px-3 h-[48px]">
     {/* Back Button, Title, Search */}
  </div>

  {/* LEVEL 2: NAVIGATION AREA (Variable) */}
  {isDeepMode ? (
      <div className="flex flex-col">
          {/* ROW A: CONTEXT STACK (The "Path") */}
          <div className="px-3 py-2 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2">
             <Button variant="outline" size="sm">
                <Icon /> Parent Category
             </Button>
             <ChevronRight className="text-zinc-300" />
             <Button variant="solid" size="sm">
                Current Category
             </Button>
          </div>

          {/* ROW B: OPTIONS DECK (The "Choices") - Full Width */}
          <div className="px-3 py-2.5 bg-white overflow-x-auto">
             {/* Horizontal Scroll of Pills */}
             <Button>Subcategory 1</Button>
             <Button>Subcategory 2</Button>
          </div>
      </div>
  ) : (
      /* Standard Mode: Gender Tabs + Circle Icons */
      <div>...</div>
  )}

  {/* LEVEL 3: FILTER BAR (40px) */}
  <div className="h-[40px] px-3 border-t border-zinc-200 bg-zinc-50/50">
     {/* Sort, Filter Buttons */}
  </div>
</div>
```

## 2. THE DATA GRID (Product Feed)

**Key Traits:** Tight gaps (`gap-2`), Flat borders, Square images.

```tsx
<div className="grid grid-cols-2 gap-2 px-3">
  {products.map(product => (
    <div className="group border border-zinc-200 bg-white rounded-md p-2 active:border-zinc-400 transition-colors">
       {/* Image: Aspect Square, Zinc-100 placeholder */}
       <div className="aspect-square bg-zinc-100 rounded-sm relative overflow-hidden mb-2">
          <img src={product.img} className="object-cover w-full h-full" />
       </div>
       
       {/* Info: Dense Text */}
       <h3 className="text-[13px] font-medium leading-tight line-clamp-2">
         {product.title}
       </h3>
       <div className="mt-1 font-bold text-[15px]">
         {product.price}
       </div>
    </div>
  ))}
</div>
```

## 3. THE "IOS" LIST ITEM (Settings/Profile)

**Key Traits:** Full width with internal padding, Separators, Chevron right.

```tsx
<div className="bg-white border-y border-zinc-200 divide-y divide-zinc-100">
   <button className="w-full flex items-center justify-between px-4 py-3 active:bg-zinc-50">
      <div className="flex items-center gap-3">
         <Icon className="text-zinc-500" />
         <span className="text-[15px] font-medium text-zinc-900">Label</span>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-300" />
   </button>
   {/* Repeat */}
</div>
```

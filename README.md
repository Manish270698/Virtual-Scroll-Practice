# Virtual Scroll Practice

A small React + TypeScript playground demonstrating two approaches to virtual scrolling (windowing) for long lists:

- Manual implementation using a scroll container and a translated inner list (`src/components/VirtualList_Manual.tsx`).
- Library-backed implementation using `react-window` (`src/components/VirtualList_Library.tsx`).

This project is intended for experimentation and learning — compare the behavior, performance and ergonomics of a hand-rolled virtual list vs. a well-tested library.

## Highlights / What I built

- Two virtual list implementations with the same props shape so they can be swapped in `App.tsx`:
  - `VirtualList_Manual` — calculates visible slice based on scrollTop, maintains a big spacer element and translates visible items into place.
  - `VirtualList_Library` — uses `react-window` List with a custom row component. Simpler to use and battle-tested.
- Uses `vh`-relative heights for easy responsive experimentation: itemHeight and container height are configured in viewport-height units in the demo.
- A large sample data set is included at `src/assets/items.ts` so you can test scrolling with many items.

## Files of interest

- `src/components/VirtualList_Manual.tsx` — manual/windowing implementation. Key ideas: container ref, scrollTop, slice calculation, translateY offset.
- `src/components/VirtualList_Library.tsx` — `react-window` based implementation using List + rowComponent.
- `src/assets/items.ts` — a long array of strings used as demo data.
- `src/types/list-interfaces.ts` — prop type (`VirtualListProps`) shared by both components.
- `src/App.tsx` — demo entry; swap which component is rendered to compare behavior.

## Props (VirtualListProps)

Both implementations accept the same props (see `src/types/list-interfaces.ts`):

- `items: string[]` — array of items to render (in the demo each item is rendered as text).
- `itemHeight: number` — height of each item expressed as `vh` in the demo (converted to px in the components).
- `height: number` — container height in `vh`.
- `overscan: number` — number of items to render outside the visible window to reduce visual popping while scrolling.

## Run (development)

These commands assume you are on Windows PowerShell (the project scripts are standard npm scripts). From the project root run:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in a browser.

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## How to experiment

- Swap components in `src/App.tsx` — uncomment the `VirtualList_Manual` usage or the `VirtualList_Library` usage.
- Change `itemHeight`, `height` and `overscan` props in `App.tsx` to see how visibleCount, jank and memory change.
- Try resizing the browser to verify the `vh` conversion logic inside each component (they convert vh → px and listen for resize events).

## Notes / Observations

- The manual implementation is useful to understand the algorithm (start/end indices, spacer height and translateY) but requires careful handling of edge cases (resize, variable heights — the demo uses fixed heights).
- `react-window` drastically reduces implementation complexity and is the recommended approach in production when item heights are fixed.
- Both components assume fixed item heights; supporting variable heights requires a different strategy (measuring items or using libraries that support dynamic heights).

## Development notes

- This project uses Vite + React 19 + TypeScript. See `package.json` for scripts and devDependencies.
- `react-window` is included as a dependency and used in `VirtualList_Library`.

## Next improvements (ideas)

- Add an example with images or complex item renderers.
- Support variable item heights (measure-on-demand or estimated sizes).
- Add small benchmarks (FPS, paint times) to compare manual vs. library under heavy load.

## License

This repository is for learning and experimentation. Add a license if you plan to publish or reuse in other projects.

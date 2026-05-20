# RNMBX_Bounds_Padding_Bug
Demonstrating "ghost padding" bug with both iOS and Android implementations

## To Test:

### build:

1. create config.ts at root with:

```
export const MAPBOX_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
```

2. yarn install
3. npx pod-install ios
4. yarn ios

### test:

Press the buttons in order. The first `setCamera` sets a center-point with a large amount of bottom padding added. This is to simulate a map with a bottom sheet over it (or similar). Pressing #2 shows that sending `setCamera` with explicit padding does not behave as expected. The padding from the previous command is remembered and added. #3 shows that applying a large negative padding opposite to the original padding does what we actually expected from #2.


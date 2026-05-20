import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from './config';
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const POINTS = [
  [-123.1207, 49.2827], // SW
  [-123.1107, 49.2827], // SE
  [-123.1107, 49.2927], // NE
  [-123.1207, 49.2927], // NW
];
const BOUNDS = {
  ne: [-123.1107, 49.2927],
  sw: [-123.1207, 49.2827],
};
export default function CameraPaddingRepro() {
  const cameraRef = useRef<MapboxGL.Camera>(null);
  // Step 1: Center on the SW point with 500px bottom padding
  const handleFlyTo = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: POINTS[0],
      zoomLevel: 15,
      padding: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 500, // Large bottom padding (e.g., simulated sheet open)
      },
      animationDuration: 1000,
    });
  };
  // Step 2: Fit bounds with small bottom padding (e.g., sheet closed or small detent)
  const handleFitBounds = () => {
    cameraRef.current?.setCamera({
      bounds: BOUNDS,
      padding: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0, // Reset bottom padding to small value
      },
      animationDuration: 1000,
    });
  };
  // Step 3: Fit bounds with big negative bottom padding (e.g., sheet open or large detent)
  const handleFitBoundsNegativePadding = () => {
    cameraRef.current?.setCamera({
      bounds: BOUNDS,
      padding: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: -500, // Large negative bottom padding
      },
      animationDuration: 1000,
    });
  };
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{ zoomLevel: 10, centerCoordinate: POINTS[0] }}
        />

        {/* Render the 4 points so you can visually see the framing */}
        <MapboxGL.ShapeSource
          id="points"
          shape={{
            type: 'FeatureCollection',
            features: POINTS.map((coord, idx) => ({
              type: 'Feature',
              id: `pt-${idx}`,
              geometry: { type: 'Point', coordinates: coord },
              properties: {},
            })),
          }}
        >
          <MapboxGL.CircleLayer
            id="circles"
            style={{ circleRadius: 10, circleColor: 'red' }}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      <View style={styles.buttonContainer}>
        <Button title="1. FlyTo SW (500 Padding)" onPress={handleFlyTo} />
        <Button title="2. Fit Bounds (No Padding)" onPress={handleFitBounds} />
        <Button
          title="3. Fit Bounds (Big Negative Padding)"
          onPress={handleFitBoundsNegativePadding}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

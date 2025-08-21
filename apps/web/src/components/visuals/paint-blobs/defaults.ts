// defaults.ts
import type { BlobsConfig } from './types'

/** Sensible defaults for the PaintBlobs component */
export const DEFAULTS: BlobsConfig = {
    maxBlobs: 8000,
    spawnPerSecond: 150,
    minRadius: 5,
    maxRadius: 20,
    jitter: 0.022,
    fadeInMs: 330,
    lifeMs: [1800, 5200],
    fadeOutMs: 900,
    bgColor: '#fff',
    useTransparent: true,
    palette: ['#fc9220ff', '#2f20fccc', '#fc20dfcc'],
    hueRange: [0, 360],
    satRange: [60, 95],
    lightRange: [55, 70],
    alpha: 0.12,
    composite: 'lighter',
    spawnOnPointer: true,
    pointerSpawnRate: 40,
}

/* ---------------- styles ---------------- */
const GOLDEN = 1.618
const WIDTH = 600
const HEIGHT = Math.round(WIDTH / GOLDEN - 34) // ≈ 272

export const outerWrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
}

export const videoBoxStyle: React.CSSProperties = {
    position: 'relative',
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    overflow: 'hidden',
    borderRadius: '12px',
    background: '#000',
    outline: 'none',
}

export const videoBoxFsStyle: React.CSSProperties = {
    position: 'fixed', // מבטיח כיסוי מלא
    inset: 0, // top/right/bottom/left = 0
    width: '100vw',
    height: '100vh',
    background: '#000',
    borderRadius: 0,
    overflow: 'hidden',
    outline: 'none',
    zIndex: 2147483647, // מעל הכל
}

export const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 0,
}

export const clickOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 0,
    padding: 0,
    margin: 0,
    cursor: 'pointer',
}

export const controlsRowStyle: React.CSSProperties = {
    width: `${WIDTH}px`,
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 4,
}

export const controlBtnStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.25)',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}

export const fallbackBoxStyle: React.CSSProperties = {
    padding: 12,
    border: '1px solid var(--color-divider-main)',
    borderRadius: 8,
    background: 'var(--color-text-on-contrast-background)',
    color: 'var(--color-text-secondary)',
    direction: 'rtl',
    fontSize: 14,
}

export const fullscreenBoxStyle: React.CSSProperties = {
    position: 'fixed', // מבטיח כיסוי מלא
    inset: 0, // top/right/bottom/left = 0
    width: '100vw',
    height: '100vh',
    background: '#000',
    borderRadius: 0,
    overflow: 'hidden',
    outline: 'none',

    zIndex: 2147483647, // מעל הכל
}

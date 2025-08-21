'use client'

import { buildAssetUrl } from '@/utils/assets'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type CraftiroAssetImageProps = Omit<ImageProps, 'src'> & {
    /** Relative path from the assets folder (e.g., "courses/course123/thumb.png") */
    relativePath?: string
    /** Fallback URL (from public) if the asset is missing */
    fallbackSrc?: string
}

/**
 * Component for loading images from assets with a fallback option.
 */
export const CraftiroAssetImage = ({
    relativePath,
    fallbackSrc = '/images/fallbacks/default.png',
    alt,
    ...rest
}: CraftiroAssetImageProps) => {
    // Ensure a non-null string for initial src
    const resolved =
        (relativePath && buildAssetUrl(relativePath)) || fallbackSrc

    const [src, setSrc] = useState<string>(resolved)

    return (
        <Image
            src={src}
            alt={alt}
            onError={() => setSrc(fallbackSrc)}
            {...rest}
        />
    )
}

export default CraftiroAssetImage

import Image from 'next/image'

type SvgImageProps = {
    src: string
    alt: string
    width?: number
    height?: number
    style?: React.CSSProperties
    className?: string
}

export const SvgImage = ({
    src,
    alt,
    width,
    height,
    style,
    className,
}: SvgImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={style}
            className={className}
            loading="lazy"
            draggable={false}
        />
    )
}

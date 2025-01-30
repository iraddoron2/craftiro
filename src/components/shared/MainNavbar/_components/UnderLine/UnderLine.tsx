type Props = {
    isActive: boolean
}

export const UnderLine = ({ isActive }: Props) => (
    <div
        style={{
            position: 'relative',
            bottom: -8,
            width: '100%',
            height: '4px',
            marginBottom: '-4px',
            backgroundColor: isActive ? '#2266C7' : 'transparent',
            zIndex: 200,
        }}
    />
)

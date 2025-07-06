'use client'

import { modules } from '@/data/demoData/modules'
import { baseColors } from '@/styles'
import { Stack, Text } from '@core'
import Link from 'next/link'

type Props = {
    moduleId?: string
}

export const ModuleCard = ({ moduleId }: Props) => {
    const currentModule = modules.find((module) => module._id === moduleId)

    if (!currentModule) {
        return <div className="module-card">Module not found</div>
    }

    const { metadata } = currentModule
    const { contentMetadata, generalInfo } = metadata

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10)',
                backgroundColor: baseColors.white,
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                gap: '12px',

                // Mobile-friendly:
                '@media (max-width: 600px)': {
                    padding: '12px',
                    borderRadius: '8px',
                    gap: '10px',
                },
            }}
        >
            <Text
                text={contentMetadata.title}
                variant="h4"
                sx={{
                    wordBreak: 'break-word',
                    fontSize: '1.5rem',
                    '@media (max-width: 600px)': {
                        fontSize: '1.2rem',
                    },
                }}
            />
            <Text
                text={`מודול מספר ${generalInfo.serialNumber}`}
                variant="body1"
                sx={{
                    fontSize: '1.3rem',
                    color: '#444',
                    '@media (max-width: 600px)': {
                        fontSize: '1.1rem',
                    },
                }}
            />

            <Stack
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 16px',
                    width: '100%',
                    maxWidth: '260px',
                    backgroundColor: baseColors.blue5,
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'regular',
                    fontSize: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10)',
                    cursor: 'pointer',
                    ':hover': {
                        backgroundColor: baseColors.blue1,
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '18px',
                        padding: '10px 12px',
                    },
                }}
            >
                <Link
                    href={contentMetadata.betaVersionUrl || '#'}
                    target="_blank"
                    style={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <Text
                        text={'לכניסה למודול'}
                        sx={{
                            fontWeight: 'inherit',
                            fontSize: 'inherit',
                            color: 'inherit',
                        }}
                    />
                </Link>
            </Stack>
        </Stack>
    )
}

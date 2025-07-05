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
                borderRadius: '8px',
                boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10)',
                backgroundColor: baseColors.white,
                width: '100%',
                maxWidth: '400px',
                margin: '16px auto',
                textAlign: 'center',
                gap: '8px',
            }}
        >
            <Text text={contentMetadata.title} variant="h4" />
            <Text
                text={`מודול מספר ${generalInfo.serialNumber}`}
                variant="body1"
            />

            <Stack
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                    width: 'fit-content',
                    minWidth: '160px',
                    backgroundColor: baseColors.blue5,
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'regular',
                    fontSize: '24px',
                    borderRadius: '8px',
                    boxShadow: '0px 6px 2px 1px rgba(0, 0, 0, 0.10)',
                    cursor: 'pointer',
                    ':hover': {
                        backgroundColor: baseColors.blue1,
                    },
                }}
            >
                <Link
                    href={contentMetadata.betaVersionUrl || '#'}
                    target="_blank"
                >
                    <Text
                        text={'לכניסה למודול'}
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 'inherit',
                            fontSize: 'inherit',
                        }}
                    />
                </Link>
            </Stack>
        </Stack>
    )
}

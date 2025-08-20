'use client'

import { modules } from '@/data/demoData/modules'
import { baseColors } from '@/styles'
import { Stack, Text } from '@craftiro/ui'
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
            className="module-card"
            style={{
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
            }}
        >
            <Text
                variant="h4"
                style={{
                    wordBreak: 'break-word',
                    fontSize: '1.5rem',
                }}
                className="module-card-title"
            >
                {contentMetadata.title}
            </Text>
            <Text
                variant="body"
                style={{
                    fontSize: '1.3rem',
                    color: '#444',
                }}
                className="module-card-serial"
            >
                {`מודול מספר ${generalInfo.serialNumber}`}
            </Text>

            <Stack
                className="module-card-link"
                style={{
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
                        style={{
                            fontWeight: 'inherit',
                            fontSize: 'inherit',
                            color: 'inherit',
                        }}
                    >
                        לכניסה למודול
                    </Text>
                </Link>
            </Stack>
        </Stack>
    )
}

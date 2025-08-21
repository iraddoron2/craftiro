import { DriveChartsLink, DriveChartsLinkLabel } from '@/types'

export const getDriveLinksArrayFromRowObject = (
    rowObject: Record<string, string>
) => {
    const leadSheet = {
        labels: ['Lead Sheet'] as DriveChartsLinkLabel[],
        url: rowObject['Lead Sheet'] || '',
    } as DriveChartsLink

    const allDriveLinks: DriveChartsLink[] = []

    if (leadSheet.url) {
        allDriveLinks.push(leadSheet)
    }

    const scale = {
        labels: ['Scale'] as DriveChartsLinkLabel[],
        url: rowObject['Scale'] || '',
    } as DriveChartsLink

    if (scale.url) {
        allDriveLinks.push(scale)
    }

    return allDriveLinks
}

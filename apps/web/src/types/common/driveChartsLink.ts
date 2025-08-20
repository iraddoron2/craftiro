import { DriveChartsLinkLabel } from './driveChartsLinkLabel'

export type DriveChartsLink = {
    labels: DriveChartsLinkLabel[] // Labels for the link, e.g. ['Sheet Music', 'Lead Sheet']
    url: string // URL of the link, e.g. 'https://drive.google.com
}

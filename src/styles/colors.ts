import { black, white } from './colors/base'
import { blue } from './colors/blue'
import { brandBlue } from './colors/brandBlue'
import { brandOrange } from './colors/brandOrange'
import { brandPink } from './colors/brandPink'
import { gray } from './colors/gray'
import { green } from './colors/green'
import { orange } from './colors/orange'
import { purple } from './colors/purple'
import { red } from './colors/red'
import { yellow } from './colors/yellow'

export const blues = {
    blue1: '#2266C7',
    blue2: '#140790',
    blue3: '#16089A',
    blue5: '#3F81DE',
    blue6: '#E1F4FF',
    blue7: '#B1D2FF',
    blue8: '#54ABED',
    blue9: '#35598C',
    blue10: '#3866A6',
}

export const neutrals = {
    white: '#FFFFFF',
    black: '#000003',
}

export const greys = {
    grey1: '#D9D9D9',
    grey2: '#BBBBBB',
    grey3: '#696969',
    grey4: '#A7A7A7',
    grey5: '#E1E1E1',
}

export const oranges = {
    orange1: '#FFA155',
    orange2: '#FFE6D1',
    orange3: '#FFD2AD',
}

export const pinks = {
    pink1: '#F2ABC5',
}

export const greens = {
    green1: '#D2FFC6',
}

export const reds = {
    red1: '#FFC6C6',
}

export const baseColors = {
    ...blues,
    ...neutrals,
    ...greys,
    ...oranges,
    ...pinks,
    ...greens,
}

export const elementsColors = {
    divider: baseColors.grey5,
}

export const colors = {
    blue,
    red,
    green,
    yellow,
    orange,
    purple,
    gray,
    black,
    white,
    brandOrange,
    brandPink,
    brandBlue,
}

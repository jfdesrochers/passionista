import { css } from 'styled-components'

const minSizes = {
    bigDesktop: 1800,
    desktop: 1200,
    tabletLandscape: 900,
    tabletPortrait: 600
}

const maxSizes = {
    phoneOnly: 600,
    smallPhoneOnly: 350
}

const media = Object.keys(minSizes).reduce((accumulator, label) => {
    accumulator[label] = (...args) => css`
        @media (min-width: ${minSizes[label]}px) {
            ${css(...args)}
        }
    `
    return accumulator
}, {})

Object.assign(media, Object.keys(maxSizes).reduce((accumulator, label) => {
    accumulator[label] = (...args) => css`
        @media (max-width: ${maxSizes[label]}px) {
            ${css(...args)}
        }
    `
    return accumulator
}, {}))

export default media
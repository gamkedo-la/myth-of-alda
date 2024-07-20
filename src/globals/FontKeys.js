const FontKeys = {
  MedievalSharp: '../../public/fonts/MedievalSharp/MedievalSharp-Regular.ttf',
  Tangerine: '../../public/fonts/Tangerine/Tangerine-Regular.ttf',
  TangerineBold: '../../public/fonts/Tangerine/Tangerine-Bold.ttf'
}

export const FamilyNames = {
  MedievalSharpRegular: 'MedievalSharp-Regular',
  TangerineRegular: 'Tangerine-Regular',
  TangerineBold: 'Tangerine-Bold'
}

export const FontFamilies = {
  MedievalSharpRegular: FamilyNames.MedievalSharpRegular,
  TangerineRegular: FamilyNames.TangerineRegular,
  TangerineBold: FamilyNames.TangerineBold
}

export const StyleConfigs = [
  `@font-face {
    font-family: "${FamilyNames.MedievalSharpRegular}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.MedievalSharp}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.TangerineRegular}";
    font-style: normal;
    font-weight: 400;
    src: url('${FontKeys.Tangerine}') format('truetype');
  }`,
  `@font-face {
    font-family: "${FamilyNames.TangerineBold}";
    font-style: normal;
    font-weight: 700;
    src: url('${FontKeys.TangerineBold}') format('truetype');
  }`
]

export default FontKeys
export const {
  MedievalSharp,
  Tangerine,
  TangerineBold
} = FontKeys
import { createTheme } from '@mui/material/styles';
import _ from 'lodash';
import baseTheme from './Base';

export default createTheme(
  _.merge(baseTheme, {
    themeName: 'Light',
    palette: {
      type: 'light',
      common: {
        black: '#000000',
        white: '#ffffff',
        blue: '#0bb7a7',
        green: '#0bb7a7',
        lightcyan: '#cff7f2',
        lightgreen: '#5acfc4',
        lightergreen: '#CFF7F2',
        lightBlue: '#f2f8fc',
        tundora: '#4E4949',
        beauBlue: '#D1E5F1',
        grey: '#E1E2EF',
        lightYellow: '#D7D8DC',
        aliceBlue: '#EDF5FA',
        echoBlue: '#99ADD1',
        hawkesBlue: '#CDDAEF',
        sapphire: '#05204A',
        zircon: '#85949466',
        red: '#F13012',
        tomatoRed: '#F14F4F',
        shipCove: '#7388A8',
        tint: '#01A601',
      primary: {
        light: '#0bb7a7',
        main: '#0bb7a7',
        dark: '#0bb7a7',
        contrastText: '#fff',
      },
      },
    },
    components: {
      MuiListItemButton: {
         styleOverrides: {
           root: {
          '&.Mui-selected': {
            backgroundColor: '#CDDAEF',
            color: '#05204A',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#CDDAEF',
            color: '#05204A',
          },
          '&:hover': {
            backgroundColor: '#CDDAEF',
            color: '#05204A',
          },
        },
         },
      },
      MuiButton: {
        styleOverrides: {
          root: {},
          contained: {
            backgroundColor: '#35ed11 !important',
            color: '#000000 !important',
          },
          outlined: {
            color: '#000000 !important',
            borderColor: '#000000 !important',
            '&:hover': {
              color: '#000000 !important',
              backgroundColor: '#fffff !important',
              borderColor: '#000000 !important',
            },
          },
          MuiButtonBase: {
            root: {
              MuiTab: {
                root: {
                backgroundColor: 'ffffff',
                '&.Mui-selected': {
                  backgroundColor: 'ffffff',
                },
              },
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#D7D8DC !important',
          },
          body: {
            backgroundColor: '#ffffff !important',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {},
          indicator: {
            backgroundColor: '#05204A',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#05204A',
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            MuiInputBase: {
                root: {
                  backgrounColor: '#ffffff !important',
                },
                input: {
                  backgrounColor: '#ffffff',
                },
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            '& .MuiSlider-track': {
              color: '#C4C9D6',
            },
            '& .MuiSlider-thumbColorPrimary': {
              color: '#05204A',
            },
            '& .MuiSlider-valueLabel': {
              background: '#E1E2EF',
              color: '#000000',
            },
          },
        },
      },
    },
  }),
);

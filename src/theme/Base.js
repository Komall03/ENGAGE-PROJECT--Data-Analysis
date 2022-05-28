const theme = {
  spacing: 5,
  direction: 'ltr',
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 13.125,
    subtitle1: {
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  styledRadio: {
    small: 13,
    standard: 15,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          border: 'none',
        },
        MuiButtonBase: {
          root: {
            MuiTab: {
              root: {
              height: 25,
              '&.Mui-selected': {
                height: 25,
              },
            },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      },
    },
    MuiTablePagination: {
			styleOverrides: {
				root: {
					width: '100%',
					display: 'block',
					borderBottom: 0,
				},
        selectLabel: {
          marginTop: 10,
        },
        displayedRows: {
          marginTop: 15,
        },
				caption: {
					userSelect: 'none',
				},
			},
		},
    MuiTableCell: {
      styleOverrides: {
        head: {
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          textTransform: 'capitalize',
          fontWeight: 600,
          textAlign: 'left',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 35,
        },
        body: {
          textTransform: 'capitalize',
          textAlign: 'left',
          borderBottom: 'none',
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 35,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          display: 'flex',
          marginBottom: -15,
          padding: 0,
          textTransform: 'none',
          '&.Mui-selected': {
            padding: 0,
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          MuiInputBase: {
              root: {
                border: 'none !important',
                width: '250px !important',
                height: '35px !important',
              },
              input: {
                border: 'none',
                width: '250px',
                height: '35px',
              },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 3,
          paddingBottom: 0,
          borderRadius: 0,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: '8px',
          '& .MuiSlider-track': {
            height: '10px',
          },
          '& .MuiSlider-rail': {
            height: '10px',
          },
          '& .MuiSlider-valueLabel': {
            top: '50px',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '7px',
        },
      },
    },
  },
};

export default theme;

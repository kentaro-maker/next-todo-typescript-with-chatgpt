import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import RouterTransition from '@/components/RouterTransition'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterTransition />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

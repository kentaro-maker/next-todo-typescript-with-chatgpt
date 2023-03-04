import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
  },
}));

const RouterTransition = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => setProgress(0);
    const handleComplete = () => setProgress(100);

    const handleRouteChange = (url: string) => {
      const delay = setTimeout(() => setProgress(0), 100);

      return () => {
        clearTimeout(delay);
      };
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return progress ? <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}><LinearProgress variant="determinate" value={progress} /></div> : null
};

export default RouterTransition;



export const MAX_CONSECUTIVE_FAILURES = 3;

export const startTimer = (setShowTimer, setTimerSeconds, setFailedAttempts) => {
  const intervalId = setInterval(() => {
    setTimerSeconds((prevSeconds) => {
      if (prevSeconds === 1) {
        setShowTimer(false);
        clearInterval(intervalId);
        setTimerSeconds(10); 
        setFailedAttempts(0); 
      }
      return prevSeconds - 1;
    });
  }, 1000);
};

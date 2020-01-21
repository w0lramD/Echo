export const getCurrentStep = (steps, direction, time) => {
  if (steps) {
    switch (direction) {
      //forwards
      case 0:
        return steps[time % steps.length];
      //backwards
      case 1:
        let fwdStep = time % steps.length;
        return steps[steps.length - fwdStep - 1];
      //forwards-backwards
      case 2:
        let fwdStep2 = time % (steps.length * 2);
        if (fwdStep2 >= steps.length)
          return steps[steps.length - (fwdStep2 % steps.length) - 1];
        else return steps[fwdStep2];
      //random
      case 3:
        return steps[Math.floor(Math.random() * steps.length)];
      default:
        return null;
    }
  }
};

export const getCurrentStepIndex = (steps, direction, time) => {
  if (steps) {
    switch (direction) {
      //forwards
      case 0:
        return time % steps.length;
      //backwards
      case 1:
        let fwdStep = time % steps.length;
        return steps.length - fwdStep - 1;
      //forwards-backwards
      case 2:
        let fwdStep2 = time % (steps.length * 2);
        if (fwdStep2 >= steps.length)
          return steps.length - (fwdStep2 % steps.length) - 1;
        else return fwdStep2;
      //random
      case 3:
        return Math.floor(Math.random() * steps.length);
      default:
        return null;
    }
  }
};

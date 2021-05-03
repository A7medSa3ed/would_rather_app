export const logger = store => next => action => {
  console.group(action.type);
  console.log("The Action is :", action);
  const resultValue = next(action);
  console.log("The New State Is :", store.getState());
  console.groupEnd();
  return resultValue;
};

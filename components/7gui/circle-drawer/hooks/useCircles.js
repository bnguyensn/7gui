import { useRef } from 'react';
import { deepCloneObject, getObjectLength } from '../utils';

/**
 * This mutates the state.
 */
const clearAllHitInState = (state) => {
  Object.values(state).forEach((circle) => {
    circle.isHit = false;
  });
};

export default function useCircles() {
  const idCounterRef = useRef(0);

  const pastStatesRef = useRef([]);
  const currentStateRef = useRef({});
  const futureStatesRef = useRef([]);

  const canUndo = () => pastStatesRef.current.length > 0;
  const canRedo = () => futureStatesRef.current.length > 0;

  const logStates = () => {
    console.log('*** Logging states ***');
    console.log(
      `Currently, there are ${getObjectLength(
        currentStateRef.current
      )} circle(s).`
    );
    console.log('Past states:');
    console.log(pastStatesRef.current);
    console.log('Current state:');
    console.log(currentStateRef.current);
    console.log('Future states:');
    console.log(futureStatesRef.current);
  };

  const undo = () => {
    if (canUndo()) {
      clearAllHitInState(currentStateRef.current);

      futureStatesRef.current.push(currentStateRef.current);
      currentStateRef.current =
        pastStatesRef.current[pastStatesRef.current.length - 1];
      pastStatesRef.current.pop();
    }
  };

  const redo = () => {
    if (canRedo()) {
      clearAllHitInState(currentStateRef.current);

      pastStatesRef.current.push(currentStateRef.current);
      currentStateRef.current =
        futureStatesRef.current[futureStatesRef.current.length - 1];
      futureStatesRef.current.pop();
    }
  };

  const updateCurrentState = (newCurrentState) => {
    clearAllHitInState(currentStateRef.current);

    pastStatesRef.current.push(currentStateRef.current);
    currentStateRef.current = newCurrentState;
    futureStatesRef.current = [];
  };

  const createCircle = ({ centerX, centerY, radius }) => {
    idCounterRef.current += 1;
    const newCircleId = idCounterRef.current;

    const newCircle = {
      id: newCircleId,
      centerX,
      centerY,
      radius,
      isHit: false,
    };

    const newCurrentState = deepCloneObject(currentStateRef.current);
    newCurrentState[newCircleId] = newCircle;

    updateCurrentState(newCurrentState);
  };

  return {
    currentStateRef,
    canUndo,
    canRedo,
    undo,
    redo,
    updateCurrentState,
    createCircle,
    logStates,
  };
}

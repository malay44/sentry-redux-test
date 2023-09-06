import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import * as Sentry from "sentry-javascript/packages/react";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  attachReduxState: false,
  stateTransformer: (state) => {
    // Transform the state to remove sensitive information
    const transformedState = {
      ...state,
      topSecret: {
        ...state.topSecret,
        // Replace sensitive information with something else
        nuclearLaunchCodes: "I love pizza",
        // or just remove it entirely
        hiddenTreasureLocation: null,
      },
      // You should also remove large data that is irrelevant to debugging to not clutter your Sentry issues
      giganticState: null,
    };

    return transformedState;
  },
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  enhancers: [sentryReduxEnhancer],
});

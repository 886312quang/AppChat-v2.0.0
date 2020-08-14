import { createSelector } from "reselect";

const selectRaw = (state) => state.auth;

// select loading
const selectInitLoading = createSelector(
  [selectRaw],
  (auth) => auth.initLoading,
);

const selectSigninLoading = createSelector(
  [selectRaw],
  (auth) => auth.signinLoading,
);

const selectSignupLoading = createSelector(
  [selectRaw],
  (auth) => auth.signupLoading,
);

// select success
const selectSigninSuccess = createSelector(
  [selectRaw],
  (auth) => auth.signinSuccess,
);

// select errors
const selectSigninError = createSelector(
  [selectRaw],
  (auth) => auth.signinError,
);
const selectSignupError = createSelector(
  [selectRaw],
  (auth) => auth.signupError,
);
const selectSendResetPasswordLoading = createSelector(
  [selectRaw],
  (auth) => auth.sendResetPasswordLoading,
);
const selectSendResetPasswordError = createSelector(
  [selectRaw],
  (auth) => auth.sendResetPasswordError,
);
const selectChangePasswordLoading = createSelector(
  [selectRaw],
  (auth) => auth.changePasswordLoading,
);

const selectChangePasswordError = createSelector(
  [selectRaw],
  (auth) => auth.changePasswordError,
);

const selectors = {
  selectInitLoading,
  selectSigninLoading,
  selectSignupLoading,
  selectSigninSuccess,
  selectSigninError,
  selectSignupError,
  selectSendResetPasswordLoading,
  selectChangePasswordLoading,
  selectChangePasswordError,
  selectSendResetPasswordError,
};

export default selectors;

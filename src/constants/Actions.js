import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({
  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null,

  LOAD_EPISODES_SUCCESS: null,
  LOAD_UPDATE_INFO_SUCCESS: null,

  AUTH_SUCCESS: null,
  AUTH_LOGOUT: null
});

export default Actions;

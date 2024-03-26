
export const actionHandlers = {
  /**
   * Define Action Handlers here
   *
   * Example:
   * // https://developer.servicenow.com/dev.do#!/reference/next-experience/vancouver/ui-framework/main-concepts/action-handlers
   * 'BUTTON_CLICKED': (coeffects) => {
   *    console.log('A button was clicked!');
   * },
   * // https://developer.servicenow.com/dev.do#!/reference/next-experience/vancouver/ui-framework/api-reference/effect-http
   * 'FETCH_USER': createHttpEffect('api/users/:id', {
   *    method: 'POST',
   *    headers: {
   *      'X-UserToken': window.g_ck
   *    },
   *    pathParams: ['id'],
   *    dataParams: 'data',
   *    successActionType: 'USER_FETCH_SUCCESS'
   * })
   */

  'NOW_BUTTON#CLICKED': (coeffects) => {
    const { updateState, dispatch, state } = coeffects;
    const { properties, shuffleIndex } = state;
    const { houses } = properties;

    // Start sorting
    updateState({ sorting: true });

    // Start "shuffling" through houses
    let newIndex = shuffleIndex;
    let newIntervalId = setInterval(() => {
      newIndex = (newIndex + 1) % houses.length;
      updateState({ shuffleIndex: newIndex });
    }, 100);

    // Choose a house
    setTimeout(() => {
      let random = Math.floor(Math.random() * (houses.length));
      dispatch('SORTING_CAT#HOUSE_SELECTED', { house: houses[random] });
      updateState({ sorting: false, house: houses[random], shuffleIndex: -1 });
      clearInterval(newIntervalId);
    }, 4000);
  }
};

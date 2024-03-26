
import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import { actionHandlers } from './actionHandlers';
import styles from './styles.scss';

import '@servicenow/now-button';
import '@servicenow/now-heading';

import cat from '../assets/sorting_cat.png';

createCustomElement('x-827743-sorting-cat', {
    initialState: {
        sorting: false,
        house: null,
        shuffleIndex: -1
    },
    view: (state, helpers) => {
        const { updateState, dispatch } = helpers;
        const { properties, sorting, house, shuffleIndex } = state;
        const { houses, student } = properties;

        let houseColor = "";
        if (house || (shuffleIndex >= 0 && houses.length > 0)) {
            houseColor = house ? house.color._reference.color.value : houses[shuffleIndex].color._reference.color.value;
        }

        return (
            <div className="sortingCat">
                <now-heading label="Sorting Cat"></now-heading>
                <div className="body">
                    <img className={`catImage ${sorting ? 'anmiate' : ''}`} alt="Sorting Cat" src={cat} />
                    <h2 className="sortingText">
                        {`Sorting ${ student._row_data.displayValue } into...`}
                    </h2>
                    {(house || shuffleIndex >= 0) && (
                        <h1 className="houseText" style={{ color: houseColor }}>
                            { house ? house._row_data.displayValue : houses[shuffleIndex]._row_data.displayValue }
                        </h1>
                    )}
                    <now-button
                        className="sortBtn"
                        label="Sort!"
                        variant="primary"
                        disabled={(sorting || house) ? true : false}
                    ></now-button>
                </div>
            </div>
        );
    },
    properties: {
        houses: {
            default: []
        },
        student: {
            default: null
        }
    },
    actionHandlers: {...actionHandlers},
    eventHandlers: [],
    styles,
    renderer: { type: snabbdom }
});

import { createStore } from "vuex";

const store = createStore({
    state: {
        reminders: [
            { title: 'vuex working' }
        ]
    },
    getters: {
        /**
         * @name reminders
         * @description Get current reminders array with all the reminders saved.
         */
        reminders (state) {
            return state.reminders
        }
    },
    mutations: {
        /**
         * @name ADD_REMINDER
         * @description Mutation to add a new reminder objeto to the reminders state.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String } 
         */
        ADD_REMINDER(state, reminder) {
            state.reminders.push(reminder)
        },
        // CLEAR_REMINDER(state, index) {
        //     state.reminders.push(reminder)
        // },
        // ADD_REMINDER(state, reminder) {
        //     state.reminders.push(reminder)
        // }
    },
    actions: {
        /**
         * @name addReminder
         * @description Action for commiting the new reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String } 
         */
        addReminder({commit}, reminder) {
            commit('ADD_REMINDER', reminder)
        }
    }
})

export default store
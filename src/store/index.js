import { createStore } from "vuex";

const store = createStore({
    state: {
        reminders: [
            { id: 'test', title: 'vuex working', dateTime: '2022-06-05T22:30', city: 'Joao pessoa', lat: '', lon: '', color: '#4d68dd', done: true }
        ]
    },
    getters: {
        /**
         * @name reminders
         * @description Get current reminders array with all the reminders saved.
         */
        reminders: (state) => {
            return state.reminders
        },
        remindersByDate: (state) => (date) => {
            return state.reminders.filter(el => {
                return new Date(date).toDateString() === new Date(el.dateTime).toDateString()
            })
        }
    },
    mutations: {
        /**
         * @name ADD_REMINDER
         * @description Mutation to add a new reminder objeto to the reminders state.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        ADD_REMINDER(state, reminder) {
            let guid = () => {
                let s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
            reminder.id = guid()
            state.reminders.push(reminder)
        },
        /**
         * @name EDIT_REMINDER
         * @description Mutation to editing a given reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        EDIT_REMINDER(state, reminder) {
            const reminderIndex = state.reminders.findIndex((obj => obj.id === reminder.id));
            state.reminders[reminderIndex] = reminder
        },
        /**
         * @name DELETE_REMINDER
         * @description Mutation to deleting a given reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        DELETE_REMINDER(state, reminder) {
            const reminderIndex = state.reminders.findIndex((obj => obj.id === reminder.id));
            state.reminders.splice(reminderIndex, 1)
        },
        /**
         * @name DELETE_DAY_REMINDERS
         * @description Mutation to deleting all reminders from a given date.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { dateTime: String } 
         */
        DELETE_DAY_REMINDERS(state, reminder) {
            const reminders = state.reminders.filter(el => {
                return new Date(reminder.dateTime).toDateString() === new Date(el.dateTime).toDateString()
            })
            reminders.forEach(e => {
                const reminderIndex = state.reminders.findIndex((obj => obj.id === e.id));
                state.reminders.splice(reminderIndex, 1)
            });
        },
        /**
         * @name DELETE_ALL_REMINDERS
         * @description Mutation to deleting all reminders.
         */
        DELETE_ALL_REMINDERS(state) {
            state.reminders = []
        },
        /**
         * @name ADD_REMINDER
         * @description Mutation to add a new reminder objeto to the reminders state.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        TOGGLE_DONE_REMINDER(state, reminder) {
            state.reminders.filter(el => {
                return reminder.id === el.id
            })[0].done = !state.reminders.filter(el => {
                return reminder.id === el.id
            })[0].done
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
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        addReminder({commit}, reminder) {
            commit('ADD_REMINDER', reminder)
        },
        /**
         * @name editReminder
         * @description Action for editing a given reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        editReminder({commit}, reminder) {
            commit('EDIT_REMINDER', reminder)
        },
        /**
         * @name deleteReminder
         * @description Action for deleting a given reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        deleteReminder({commit}, reminder) {
            commit('DELETE_REMINDER', reminder)
        },
        /**
         * @name deleteDayReminders
         * @description Action for deleting all reminders by date.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { dateTime: String } 
         */
        deleteDayReminders({commit}, reminder) {
            commit('DELETE_DAY_REMINDERS', reminder)
        },
        /**
         * @name deleteAllReminders
         * @description Action for deleting all reminders.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { dateTime: String } 
         */
        deleteAllReminders({commit}) {
            commit('DELETE_ALL_REMINDERS')
        },
        /**
         * @name toggleDoneReminder
         * @description Action for updating the done status on a reminder.
         * @param {Array} reminder object containing the reminder new reminder data e.g. { title: String, ... } 
         */
        toggleDoneReminder({commit}, reminder) {
            commit('TOGGLE_DONE_REMINDER', reminder)
        }
    }
})

export default store
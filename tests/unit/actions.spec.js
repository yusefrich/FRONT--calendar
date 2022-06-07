import store, { actions, state } from "@/store"
import testAction from 'vue-test-actions'

const { addReminder, editReminder, deleteReminder, deleteDayReminders, deleteAllReminders } = actions
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * @name generateString
 * @description Generate a random string with n characters.
 * @param {Number} length the total number of characters
 */
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
/**
 * @name guid
 * @description Generate a random id.
 */
let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

describe('actions', () => {
    test('tests addReminder with a mock', () => {
        // Arrange
        const title = generateString(5)
        const payload = { id: null, title: title, dateTime: '2022-06-05T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        // Act
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload}], [], payload, store)
        // Asset
        expect(state.reminders.length).toBe(1)
        expect(state.reminders[0].title).toBe(title)
    })
    test('tests addReminder with a title with more than 30 chars', () => {
        // Arrange
        const title = generateString(100)
        const payload = { id: null, title: title, dateTime: '2022-06-05T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        // Act
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload}], [], payload, store)
        // Asset
        expect(state.reminders.length).toBe(2)
        expect(state.reminders[state.reminders.length - 1].title.length).toBeLessThanOrEqual(30)
        expect(state.reminders[state.reminders.length - 1].title).toBe(title.substring(0, 30))
    })
    test('tests editReminder with a mock', () => {
        // Arrange
        const id = guid()
        const title = generateString(30)
        const newTitle = generateString(15)
        let payload = { id: id, title: title, dateTime: '2022-06-05T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        // Act
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload}], [], payload, store)
        payload.title = newTitle
        // Asset
        testAction(editReminder, [{ type: 'EDIT_REMINDER', payload: payload}], [], payload, store)
        expect(state.reminders[state.reminders.length - 1]).toBe(payload)
    })
    test('tests deleteReminder with a mock', () => {
        // Arrange
        const id = guid()
        const title = generateString(30)
        const payload = { id: id, title: title, dateTime: '2022-06-05T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        // Act
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload}], [], payload, store)
        // Asset
        expect(state.reminders).toContain(payload)
        // Act
        testAction(deleteReminder, [{ type: 'DELETE_REMINDER', payload: payload}], [], payload, store)
        // Asset
        expect(state.reminders.includes(payload)).toBe(false)
    })
    test('tests deleteDayReminders with a mock', () => {
        // Arrange
        const payload = { id: guid(), title: generateString(30), dateTime: '2022-06-08T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        const payload2 = { id: guid(), title: generateString(30), dateTime: '2022-06-08T22:30', city: 'Joao Pessoa', lat: -19.809444, lon: -43.173334, color: '#4d68dd', done: false }
        const payload3 = { dateTime: '2022-06-08' }
        // Act
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload}], [], payload, store)
        testAction(addReminder, [{ type: 'ADD_REMINDER', payload: payload2}], [], payload2, store)
        // Asset
        expect(state.reminders.filter(el => {
            return new Date('2022-06-08T22:30').toDateString() === new Date(el.dateTime).toDateString()
        }).length).toBe(2)
        // Act
        testAction(deleteDayReminders, [{ type: 'DELETE_DAY_REMINDERS', payload: payload3}], [], payload3, store)
        // Asset
        expect(state.reminders.filter(el => {
            return new Date('2022-06-08').toDateString() === new Date(el.dateTime).toDateString()
        }).length).toBe(0)
    })
    test('tests deleteAllReminders with a mock', () => {
        // Asset
        expect(state.reminders.length).toBeGreaterThan(0)
        // Act
        testAction(deleteAllReminders, [{ type: 'ADD_REMINDER', payload: null}], [], null, store)
        // Asset
        expect(state.reminders.length).toBe(0)
    })
})

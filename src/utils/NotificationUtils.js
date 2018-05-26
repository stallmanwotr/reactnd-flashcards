import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'ReactNdFlashcards:notifications';

const DEFAULT_NOTIFICATION = {
    title: 'Remember to study!',
    body: "Don't forget to complete a quiz today!",
};

function createNotification() {
    return {
        ...DEFAULT_NOTIFICATION,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

/**
 * Removes all scheduled notifications from the mobile device.
 */
export function clearNotification() {
    console.info('Clearing the notification.');
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

/**
 * Schedule the notification, after the user has granted permission.
 */
function _setupNotificationAfterPermission() {
    console.info('cancelAllScheduledNotificationsAsync');
    Notifications.cancelAllScheduledNotificationsAsync()

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(20)
    tomorrow.setMinutes(0)

    // For testing. Notes:
    // 1) Seems to happen a minute or so after the time below.
    // 2) Possibly only shows if the Expo app is closed (?).
    //tomorrow.setDate(tomorrow.getDate())
    //tomorrow.setHours(14)
    //tomorrow.setMinutes(27)

    console.info('scheduleLocalNotificationAsync');
    Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
            time: tomorrow,
            repeat: 'day',
        }
    );
}

/**
 * Set's up a repeating notification, starting from tomorrow.
 */
export function setupNotification() {
    console.info('Scheduling the notification.');

    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        console.info('NOTIFICATION_KEY: ' + data);
        if (data === null) {

            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                console.info('Permission status: ' + status);
                if (status === 'granted') {

                    _setupNotificationAfterPermission();

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}

/**
 * Clear the notification for today, and re-setup for tomorrow.
 */
export function clearNotificationForToday() {
    clearNotification()
        .then(setupNotification());
}


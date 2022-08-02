import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';

function Screen() {

    async function onDisplayNotification() {
        // Create a channel
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          },
        });
      }

  return (
    <View>
      <Button title="Display Notification" onPress={() => {}} />
    </View>
  );
}
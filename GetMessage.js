import GetSmsAndroid from 'react-native-get-sms-android';

const GetMessage = phone => {
  const filter = phone
    ? {box: '', address: phone}
    : {
        box: '',
      };
  console.log('i am clicked', filter);

  return new Promise((resolve, reject) => {
    GetSmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        reject('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        const allMessages = JSON.parse(smsList);
        const result = Object.values(
          allMessages.reduce((acc, item) => {
            const phoneNum = item.address;
            const type = item.type === 1 ? 'received' : 'sent'; // Check if the message is received or sent
            const message = {body: item.body, type};
            if (acc[phoneNum]) {
              acc[phoneNum].messages.push(message);
            } else {
              acc[phoneNum] = {phoneNum, messages: [message]};
            }
            return acc;
          }, {}),
        );
        resolve(result);
      },
    );
  });
};

export default GetMessage;

import GetSmsAndroid from 'react-native-get-sms-android';

const GetMessage = (phone) => {
  console.log('i am clicked',phone);
  const filter = {
    box: '',
  };

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
            if (acc[item.address]) {
              acc[item.address].body.push(item.body);
            } else {
              acc[item.address] = {...item, body: [item.body]};
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

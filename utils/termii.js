import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.TERMII_API_KEY;
const apiUrl = process.env.TERMII_API_URL;
const senderId = process.env.TERMII_SENDER_ID;

export const sendSMS = async (message, phone) => {
	try {
		// console.log('message  and message', message);
		// console.log('phone  and phone', phone);
		// const { data: senderIds } = await axios.get(
		// 	`${apiUrl}/sender-id?api_key=${apiKey}`
		// );
		// const senderIdResponse = await axios.post(`${apiUrl}/sender-id/request`, {
		// 	apiKey,
		// 	serder_id: senderId,
		// 	company: 'firefly corps',
		// 	useCcse: 'your firefly id is 1234',
		// });
		// console.log('senderIdResponse', senderIdResponse);

		const response = await axios.post(`${apiUrl}/sms/send`, {
			from: senderId,
			sms: message,
			// sms: message,
			// serder_id: senderId,
			to: phone,
			type: 'plain',
			api_key: apiKey,
			channel: 'generic',
		});
		console.log(response.data);
		// if (response.data.code !== 'ok') {
		// 	throw new Error('Failed to send SMS');
		// }

		// return data;
	} catch (error) {
		console.log('termii error', error);
		throw error;
	}
};

export const getLocationDataFromLatAndLong = async (
	latitude: number,
	longitude: number
): Promise<{ city: string; state: string }> => {
	const response = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
	);
	const data = await response.json();
	return {
		city: data?.address?.town || data?.address?.city || data?.address?.village,
		state: data?.address?.country
	};
};

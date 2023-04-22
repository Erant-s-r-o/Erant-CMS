export const errors = {
	1001: 'Nickname is already taken',
	409: 'A user with the same email already is in Erant',
	401: 'Invalid credentials.',
	400: 'Email musts be valid.',
}

export const getErrorMessage = (code: number) => {
	return errors[code]
}

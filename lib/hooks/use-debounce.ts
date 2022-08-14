import * as React from 'react';

/**
 * Simple debounce hook for delayed queries mmostly.
 * @param value The value that you want to debounce.
 * @param debounceTime An optional param for setting the time before debounce.
 * @returns The debounced value.
 */
const useDebounce = <T>(value: T, debounceTime?: number): T => {
	const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

	// Watch for a change in the value const.
	React.useEffect(() => {
		// Create a timeout process and set the value to debounced value.
		const debounceTimer = setTimeout(() => {
			setDebouncedValue(value);
		}, debounceTime || 500);

		// Clean up timeout process on component unmount.
		return () => {
			clearTimeout(debounceTimer);
		};
	}, [value]);

	return debouncedValue;
};

export default useDebounce;

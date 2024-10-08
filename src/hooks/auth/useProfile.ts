import { useQuery } from '@tanstack/react-query';

import UserService from '@/services/user.service';

export default function UseProfile() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile()
	});

	return { data, isLoading, refetch };
}

import { FC, PropsWithChildren } from 'react';

import { AppLayout } from '@/components/app-layout/AppLayout';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return <AppLayout>{children}</AppLayout>;
};

export default Layout;

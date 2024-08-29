import { NextRequest, NextResponse } from 'next/server';

import { DASHBOARD_PAGES } from './config/pages-url.config';
import { EnumTokens } from '@/enums/auth.enum';

export function middleware(request: NextRequest, response: NextResponse) {
	const { nextUrl, url, cookies } = request;

	if (nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/auth', url));
	}

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
	const isAuthPage = url.includes('/auth');

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/app/:path*', '/auth/:path']
};

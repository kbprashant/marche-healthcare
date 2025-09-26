import React, { useMemo } from 'react';

// Lightweight JSON-LD injector with a couple of presets for SPA pages
// Usage examples:
//  <SEOJsonLd site webpage={{ name: title, description }} breadcrumb />
//  <SEOJsonLd items={[ customJsonLdObject, ... ]} />

const SITE_URL = 'https://marchehealthcare.org';
const LOGO_URL = `${SITE_URL}/logo_icon.png`;

function siteJson() {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			url: SITE_URL,
			name: 'Marche Healthcare',
			potentialAction: {
				'@type': 'SearchAction',
				target: `${SITE_URL}/search?q={search_term_string}`,
				'query-input': 'required name=search_term_string',
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			url: SITE_URL,
			name: 'Marche Healthcare',
			logo: {
				'@type': 'ImageObject',
				url: LOGO_URL,
			},
			sameAs: [
				'https://www.linkedin.com/company/marche-healthcare/',
				'https://x.com/info_march49738',
				'https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej',
				'https://youtube.com/@marchehealthcare',
			],
		},
	];
}

function webPageJson({ name, description, url }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: name || 'Marche Healthcare',
		description: description || 'Innovating to make advanced healthcare accessible for all.',
		url: url || (typeof window !== 'undefined' ? window.location.href : SITE_URL),
		inLanguage: 'en',
		isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Marche Healthcare' },
	};
}

function breadcrumbJson(items) {
	const list = (items || []).map((it, idx) => ({
		'@type': 'ListItem',
		position: idx + 1,
		name: it.name,
		item: it.item,
	}));
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: list,
	};
}

function defaultBreadcrumbFromLocation() {
	if (typeof window === 'undefined') return null;
	const path = window.location.pathname.replace(/\/+$/, '');
	const parts = path.split('/').filter(Boolean);
	const label = (seg) => {
			const map = {
			'': 'Home',
			home: 'Home',
			about: 'About Us',
			products: 'Products',
			news: 'Broadcasts',
			videos: 'Videos',
			contact: 'Contact',
			careers: 'Careers',
			careersapply: 'Careers Apply',
				'privacy-policy': 'Privacy Policy',
			'termscondition': 'Terms & Conditions',
			incubation: 'Incubation',
			investor: 'Investor',
			journal: 'Journal',
		};
		return map[seg?.toLowerCase?.()] || seg?.[0]?.toUpperCase() + seg?.slice(1);
	};
	const items = [{ name: 'Home', item: SITE_URL }];
	let acc = '';
	parts.forEach((seg) => {
		acc += `/${seg}`;
		items.push({ name: label(seg), item: `${SITE_URL}${acc}` });
	});
	return items.length > 1 ? items : null;
}

export default function SEOJsonLd({ site = false, webpage = null, breadcrumb = false, items = null }) {
	const computed = useMemo(() => {
		const arr = [];
		if (site) arr.push(...siteJson());
		if (webpage) arr.push(webPageJson(webpage));
		if (breadcrumb) {
			const bc = defaultBreadcrumbFromLocation();
			if (bc) arr.push(breadcrumbJson(bc));
		}
		if (Array.isArray(items) && items.length) arr.push(...items);
		if (!arr.length) return null;
		// Prefer a single @graph
		return JSON.stringify({ '@context': 'https://schema.org', '@graph': arr });
	}, [site, webpage, breadcrumb, items]);

	if (!computed) return null;
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: computed }} />;
}


import Head from 'next/head';
import TableLayout from './tableLayout';
import NavigationCustom from '@/components/navigate';

export default function ListTablePage() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Table Layout</title>
        <meta name="description" content="Table layout with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationCustom menuItems={[
            { label: 'Home', url: '/' },
            { label: 'About', url: '/' },
            { label: 'Services', url: '/' },
            { label: 'Contact', url: '/' },
            ]}/>
        <TableLayout />
      </main>
    </div>
  );
}

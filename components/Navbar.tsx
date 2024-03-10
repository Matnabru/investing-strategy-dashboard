import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/sdca">SDCA</Link></li>
        <li><Link href="/tpi">TPI</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

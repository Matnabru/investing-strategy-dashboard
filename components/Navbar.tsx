import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 ">
      <ul className="flex space-x-4">
        <li className='hover:text-gray-300'><Link href="/">Home</Link></li>
        <li className='hover:text-gray-300'><Link href="/sdca">SDCA</Link></li>
        <li className='hover:text-gray-300'><Link href="/tpi">TPI</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

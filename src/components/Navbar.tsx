import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';



const Navbar = () => {
    return (
        <header className='py-4'>
            <nav className='flex w-full screen-max-width px-4'>
                <img src={appleImg} alt='apple' width={14} height={14} />

                <div className='flex flex-1 justify-center max-sm:hidden gap-8'>
                    {
                        navLists.map((item) => (
                            <div className='text-sm cursor-pointer text-primary hover:text-white transition-all' key={item}>
                                {item}
                            </div>
                        ))
                    }
                </div>

                <div className='flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1'>
                    <img src={searchImg} alt="search" width={18} height={18} />
                    <img src={bagImg} alt="bag" width={18} height={18} />

                </div>
            </nav>
        </header>
    );
};

export default Navbar;
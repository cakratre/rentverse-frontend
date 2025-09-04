const Navbar = () => {
    return (
        <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center">
            <div className="w-[300px]">
            <div className="flex justify-between p-5 rounded-full border border-black/5 bg-transparent backdrop-blur">
                <ul>
                    RENTVERSE
                </ul>
                <ul className="flex gap-5">
                    <li>
                        <a href="">Testimoni</a>
                    </li>
                    <li>
                        <a href="">FAQ</a>
                    </li>
                </ul>
            </div>
            </div>


        </nav>
    )
};

export default Navbar;
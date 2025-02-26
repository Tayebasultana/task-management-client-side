


const Footer = () => {
    return (
        <div>
             <footer className="bg-black text-white py-6">
               <div className="container mx-auto text-center">
                 <p className="text-lg mb-2">&copy; 2025 Task Management. All Rights Reserved.</p>
                 <p className="text-sm">
                   Developed by <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer" className="text-[#859F3D] hover:text-[#758c35]">Tayeba Sultana</a>
                 </p>
                 <div className="mt-4">
                   <a href="https://github.com/Tayebasultana" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#859F3D] mx-2">GitHub</a>
                   <a href="https://www.linkedin.com/in/tayeba-sultana-0524a6350/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#859F3D] mx-2">LinkedIn</a>
                 </div>
               </div>
             </footer>
        </div>
    );
};

export default Footer;
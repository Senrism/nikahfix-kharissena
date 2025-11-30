import React, { useEffect, useState } from 'react';


export default function Footer() {
  //get params from url
  const [to, setTo] = useState('Guest');

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);
      const to = url.searchParams.get('to');
      setTo(to ? to : 'Guest');
    }
  }, []);
  return (
    <div>
      <div className="mt-8 flex flex-col  items-center">
        <p className="text-white text-sm">
          Thank you for checking up all the things up there!
        </p>
        <p className="text-white text-sm">Can’t wait to see u again! &lt;3</p>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <p className="text-[10px] text-[#A3A1A1] mb-6">
          E-Invitation made with ♥ by{' '}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/arifintajul4"
          >
            Tajul Arifin S 
          </a>
          &nbsp; and customized by
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/febry-lasena-darmawan/"
          >
            &nbsp; Febry Lasena D
          </a>
        </p>
        {["tor management", "alfin", "fikri", "reggy & partner", "pak nicholas patrick", "guest"].includes(to.toLowerCase()) && (
          <p className="text-[10px] text-[#A3A1A1] mb-6 text-center">
            Special thanks to Alturian and Pak Nicholas Patrick<br />
            For providing material support, and for the skills and knowledge I gained—both of which made it possible for me to complete this website.
          </p>
        )}
      </div>
    </div>
  );
}
